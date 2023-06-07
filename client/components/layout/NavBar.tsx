import {ConnectButton} from "../examples/ConnectButton";
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
    <div className="z-50 px-10 py-3">
      <nav className="layout flex container mx-auto">
        <div className="flex-1">
          <Link className="text-4xl" href="/">hērōicus</Link>
          {/*<Link href="/portal">Portal</Link>*/}
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
          <div className="border-4 p-1 bg-neutral-900 connect-btn-container hover:border-amber-200">
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
