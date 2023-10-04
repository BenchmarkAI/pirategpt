import "@/styles/globals.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import type { AppProps } from "next/app";
import { uuid } from "uuidv4";
import Cookies from "js-cookie";
import { UserCreditsProvider } from "@chipp/nextjs-chipp/client";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Check for existing UUID
    let userUUID = Cookies.get("userUUID");

    // If UUID does not exist, create a new one and store it in a cookie
    if (!userUUID) {
      userUUID = uuid();
      Cookies.set("userUUID", userUUID, { expires: 7 }); // expires in 7 days
    }
  });

  return (
    <UserCreditsProvider>
      <Component {...pageProps} />
    </UserCreditsProvider>
  );
}
