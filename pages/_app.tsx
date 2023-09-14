import "@/styles/globals.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { UserCreditsProvider } from "@chipp/nextjs-chipp/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <UserCreditsProvider>
        <Component {...pageProps} />
      </UserCreditsProvider>
    </UserProvider>
  );
}
