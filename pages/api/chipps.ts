// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Chipp from "chipp";
import { get } from "http";
import { getSession } from "@auth0/nextjs-auth0";

const chipp = new Chipp({
  apiKey: process.env.CHIPP_API_KEY as string,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const session = await getSession(req, res);
      const userId = session?.user?.sub;

      const userChippBalance = await chipp.getUserCredits(userId as string);

      res.status(200).json({ balance: userChippBalance });
      break;
    }
    case "POST": {
      const session = await getSession(req, res);
      const userId = session?.user?.sub;

      await chipp.deductCreditsFromUser({
        userId,
        quantity: 1,
      });

      res.status(200).json({ message: "Charged 1 credit" });
      break;
    }
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
