import {ConnectButton} from "./examples/ConnectButton";
import {useEffect, useState} from "react";
import Link from "next/link";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  // const address = useAddress();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-neutral-950 shadow px-10 py-3">
      <nav className="layout flex">
        <div className="flex-1">
          <Link className="text-2xl" href="/">FTM Rental</Link>
          <Link href="/my">My Rentals</Link>
        </div>

        {/*<div className="">*/}
        {/*<Link href="/" className>*/}
        {/*  <Image*/}
        {/*    src="/logo.png"*/}
        {/*    width={48}*/}
        {/*    height={48}*/}
        {/*    alt="NFT marketplace sample logo"*/}
        {/*  />*/}
        {/*</Link>*/}

        {/*  <div className={styles.navMiddle}>*/}
        {/*    <Link href="/buy" className={styles.link}>*/}
        {/*      Buy*/}
        {/*    </Link>*/}
        {/*    <Link href="/sell" className={styles.link}>*/}
        {/*      Sell*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="">
          <div className="">
            {/*<ConnectWallet theme="dark" btnTitle="Connect Wallet"/>*/}
            {hasMounted && <ConnectButton/>}

          </div>
          {/*{address && (*/}
          {/*  <Link className={styles.link} href={`/profile/${address}`}>*/}
          {/*    <Image*/}
          {/*      className={styles.profileImage}*/}
          {/*      src="/user-icon.png"*/}
          {/*      width={42}*/}
          {/*      height={42}*/}
          {/*      alt="Profile"*/}
          {/*    />*/}
          {/*  </Link>*/}
          {/*)}*/}
        </div>
      </nav>
    </div>
  );
}
