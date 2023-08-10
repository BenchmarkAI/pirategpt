// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Chipp from "chipp";

const chipp = new Chipp({
  apiKey: process.env.CHIPP_API_KEY as string,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { userId } = req.query;
      const paymentURL = await chipp.getPaymentURLForUser(userId as string);

      res.status(200).json({ paymentURL });
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
