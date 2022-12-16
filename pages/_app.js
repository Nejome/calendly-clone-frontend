import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import {ToastContainer} from "react-toastify";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />

    <ToastContainer />
  </>
}

export default MyApp
