import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import * as Progress from "@radix-ui/react-progress";
import * as Toast from "@radix-ui/react-toast";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

const Loader = ({ complete }: { complete: boolean }) => {
  const [progress, setProgress] = useState(complete ? 66 : 13);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (complete) {
      setProgress(100);
      const timer = setTimeout(() => {
        setHidden(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setProgress(66);
    }
  }, [complete]);

  return (
    <Progress.Root
      className={clsx(
        "fixed top-0 h-[2px] w-full overflow-hidden ",
        hidden ? "opacity-0" : "opacity-100"
      )}
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full bg-[#f00] transition-transform duration-[300ms]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
      setComplete(false);
    });

    router.events.on("routeChangeComplete", () => {
      setLoading(false);
      setComplete(true);
    });

    router.events.on("routeChangeError", () => {
      setLoading(false);
    });
  }, [router]);

  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      <SessionProvider session={session}>
        {loading && <Loader complete={complete} />}
        {complete && <Loader complete={complete} />}
        <Head>
          <title>Suzume</title>
          <meta name="description" content="💭" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </Toast.Provider>
  );
};

export default api.withTRPC(MyApp);
