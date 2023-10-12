import { handleCredits } from "@chipp/nextjs-chipp";
import mockUserId from "@/utils/getMockUserId";

// We use mockUserId only for demonstration purposes.
// You will need to retrieve a unique identifier for
// your user via the HTTP request. E.g. pass a cookie
// to an auth library and use the user's email as the
//  unique identifier.
export default handleCredits({
  getUserIdFromRequest: async (req, res) => {
    return mockUserId;
  },
});
