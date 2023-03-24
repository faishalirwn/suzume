import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <nav className="flex items-center justify-between">
        <Link href="/">Logo</Link>
        <div className="flex items-center justify-between gap-12">
          <Link href="/">Explore</Link>
          <Link href="/">Library</Link>
          <Link href="/">Submit</Link>
          <Link href="/">Search</Link>
        </div>
        <Link
          href="/login"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </Link>
      </nav>
    </>
  );
};

export default Header;
