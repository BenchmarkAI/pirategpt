import { handleCredits } from "@chipp/nextjs-chipp";

export default handleCredits({
  getUserIdFromRequest: async (req, res) => {
    const userId = req.cookies.userUUID;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return "";
    }

    return userId as string;
  },
});
