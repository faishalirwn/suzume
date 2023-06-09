import clsx from "clsx";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <div
      className={clsx(className, {
        "max-h-screen overflow-hidden": router.pathname === "/song/[songId]",
      })}
    >
      <Header />
      <main
        className={clsx("mx-auto", {
          container: router.pathname !== "/song/[songId]",
        })}
      >
        {children}
      </main>
      {router.pathname !== "/song/[songId]" ?? <Footer />}
    </div>
  );
};

export default Layout;
