import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Script from "next/script";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        defer
        data-domain="clash.userexe.me"
        src="https://analytics.userexe.me/js/script.js"
      />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
