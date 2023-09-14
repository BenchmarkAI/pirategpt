import { getSession } from "@auth0/nextjs-auth0";
import { handleCredits } from "@chipp/nextjs-chipp";

export default handleCredits({
  getUserIdFromRequest: async (req, res) => {
    const session = await getSession(req, res);
    if (!session?.user.sub) {
      res.status(401).json({ error: "Unauthorized" });
    }

    return session?.user.sub as string;
  },
});
