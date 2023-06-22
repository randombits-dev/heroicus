import '@rainbow-me/rainbowkit/styles.css'
import {chains, config} from "../../utils/wagmi";
import {ConnectButton, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {useAccount, WagmiConfig} from "wagmi";
import * as React from "react";
import {PropsWithChildren} from "react";
import {Navbar} from "./NavBar";
import {customRainbowTheme} from "../../utils/rainbow-theme";


export default function WalletLayout({flex, children}: PropsWithChildren<{ flex?: boolean }>) {
  const extraClasses = flex ? ' flex flex-col' : '';
  const {address} = useAccount();

  const renderContent = () => {
    if (address) {
      return <>
        <Navbar/>
        {children}
      </>;
    } else {
      return <div className="flex flex-col min-h-screen">
        <div className="m-auto text-4xl"><ConnectButton/></div>
      </div>;
    }
  };

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} modalSize="compact" theme={customRainbowTheme}>
        <div className={"min-h-screen bg-neutral-900 main-container text-neutral-300" + extraClasses}>
          {renderContent()}
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
