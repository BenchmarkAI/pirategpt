import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import Chipp from "chipp";
import { MessageModel } from "@chatscope/chat-ui-kit-react";
const configuration = new Configuration({
  organization: process.env.ORG_ID as string,
  apiKey: process.env.OPEN_AI_API_KEY as string,
});
const openai = new OpenAIApi(configuration);

const chipp = new Chipp({
  apiKey: process.env.CHIPP_API_KEY as string,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.cookies.userUUID;

    const user = await chipp.getUser({ userId: userId as string });
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    // See if the user has enough credits to send a message
    const userChippBalance = await user.getCredits();
    if (userChippBalance < 1) {
      // Get a payment URL for the user to add more credits
      const paymentURL = await user.getPackagesURL({
        // Return the user to the homepage after they've paid
        // BASE_URL is set in .env to be the URL of the homepage
        returnToUrl: process.env.BASE_URL as string,
      });
      res.status(200).json({
        content: `You don't have enough credits to send a message. Please add more credits at ${paymentURL}`,
      });
      return;
    }

    const body = JSON.parse(req.body);
    const { messageList } = body;
    const formattedMessageList = messageList.map((message: MessageModel) => ({
      role: message.sender === "Me" ? "user" : "assistant",
      content: message.message,
    }));

    const messages = [
      {
        role: "system",
        content:
          "You are a Pirate that only says arrgh and recites pirate facts, no matter what the user says.",
      },
      ...formattedMessageList,
    ];

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages,
    });

    // Deduct 1 credit from the user only if the message is sent successfully
    // so that we don't charge the user if the message fails to send
    await user.deductCredits(1);

    res.status(200).json({
      content: completion.data.choices[0].message?.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
