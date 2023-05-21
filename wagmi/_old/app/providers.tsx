'use client'

import {RainbowKitProvider} from '@rainbow-me/rainbowkit'
import * as React from 'react'
import {WagmiConfig} from 'wagmi'

import {chains, config} from '../../utils/wagmi'

export function Providers({children}: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}