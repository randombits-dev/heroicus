import {ConnectButton} from '@rainbow-me/rainbowkit'
import Link from "next/link";
import Image from "next/image";
import heroicus from '../../public/images/heroicus.png'

export function Navbar() {

  return (
    <div className="z-50 px-10 py-3">
      <nav className="layout flex container mx-auto">
        <div className="flex-1">
          {/*<Link className="text-2xl" href="/portal">hērōicus</Link>*/}
          <Link className="text-2xl" href="/portal"><Image src={heroicus} width="50" height="50" alt="home link"
                                                           className="inline-block"/></Link>
          <Link className="ml-10" target="_blank" href="https://docs.heroicus.xyz">Docs</Link>
        </div>

        <div className="">
          <ConnectButton/>
        </div>
      </nav>
    </div>
  );
}
