import '@rainbow-me/rainbowkit/styles.css'
import {chains, config} from "../../utils/wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {WagmiConfig} from "wagmi";
import * as React from "react";
import {PropsWithChildren} from "react";
import {Navbar} from "./NavBar";
import {customRainbowTheme} from "../../utils/rainbow-theme";

export default function WalletLayout({flex, children}: PropsWithChildren<{ flex?: boolean }>) {
  const extraClasses = flex ? ' flex flex-col' : '';
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} modalSize="compact" theme={customRainbowTheme}>
        <div className={"min-h-screen bg-neutral-900 main-container text-neutral-300" + extraClasses}>
          <Navbar/>
          {children}
        </div>

      </RainbowKitProvider>
    </WagmiConfig>
  )
}
