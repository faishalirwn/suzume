import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import clsx from "clsx";

const navLinkClassNames = "hover:text-white";

const Header = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <>
      <nav className="flex items-center justify-between p-5 text-xl font-medium text-white/50">
        <Link
          className={clsx(navLinkClassNames, {
            "text-white": router.pathname === "/",
          })}
          href="/"
        >
          雀
        </Link>
        <div className="flex items-center justify-between gap-12 ">
          {/* <Link
            className={clsx(navLinkClassNames, {
              "text-white": router.pathname === "/explore",
            })}
            href="/explore"
          >
            Explore
          </Link>
          <Link
            className={clsx(navLinkClassNames, {
              "text-white": router.pathname === "/library",
            })}
            href="/library"
          >
            Library
          </Link> */}
          {sessionData && (
            <Link
              className={clsx(navLinkClassNames, {
                "text-white": router.pathname === "/submit",
              })}
              href="/submit"
            >
              Submit
            </Link>
          )}
          {/* <Link
            className={clsx(navLinkClassNames, {
              "text-white": router.pathname === "/search",
            })}
            href="/"
          >
            Search
          </Link> */}
        </div>
        <button
          className={navLinkClassNames}
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </nav>
    </>
  );
};

export default Header;
