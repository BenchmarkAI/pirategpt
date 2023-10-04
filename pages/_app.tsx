import "@/styles/globals.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import type { AppProps } from "next/app";
import { UserCreditsProvider } from "@chipp/nextjs-chipp/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserCreditsProvider>
      <Component {...pageProps} />
    </UserCreditsProvider>
  );
}
