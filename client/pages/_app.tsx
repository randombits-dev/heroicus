import '@rainbow-me/rainbowkit/styles.css'
import type {AppProps} from "next/app";
import * as React from "react";
import '../styles/index.css';
import '../styles/globals.css';
import {setup} from "goober";
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});


setup(React.createElement);

export default function RootLayout({Component, pageProps}: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />

    </div>
  )
}
