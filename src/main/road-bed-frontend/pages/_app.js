import { store } from "@/redux/store";
import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { Provider } from "react-redux";

const progress = new ProgressBar({
  size:4,
  color: "#14B8A5",
  className: "z-50",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
