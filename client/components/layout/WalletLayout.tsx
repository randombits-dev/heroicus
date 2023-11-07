import '@rainbow-me/rainbowkit/styles.css';
import {chains, config} from "../../utils/wagmi";
import {ConnectButton, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {useAccount, WagmiConfig} from "wagmi";
import * as React from "react";
import {PropsWithChildren} from "react";
import {Navbar} from "./NavBar";
import {customRainbowTheme} from "../../utils/rainbow-theme";


const MainContent = ({children}: PropsWithChildren) => {
  const {address} = useAccount();

  if (address) {
    return <>
      <Navbar/>
      <div className="bg-neutral-950 shadow-2xl rounded-lg lg:m-10 m-1 px-10 py-5 flex flex-col text-center">
        Warning: This is an alpha release, and the servers should only be used for non-sensitive data purposes.
      </div>
      {children}
    </>;
  } else {
    return <div className="flex flex-col min-h-screen">
      <div className="m-auto text-4xl"><ConnectButton/></div>
    </div>;
  }
};

export default function WalletLayout({flex, children}: PropsWithChildren<{ flex?: boolean }>) {
  const extraClasses = flex ? ' flex flex-col' : '';


  return (
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} modalSize="compact" theme={customRainbowTheme}>
          <div className={"min-h-screen bg-neutral-900 main-container text-neutral-300" + extraClasses}>
            <MainContent>{children}</MainContent>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
  );
}
