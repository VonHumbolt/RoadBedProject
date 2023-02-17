import { store } from "@/redux/store";
import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react"

const progress = new ProgressBar({
  size:4,
  color: "#14B8A5",
  className: "z-50",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);


export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />

      </SessionProvider>
    </Provider>
  );
}
