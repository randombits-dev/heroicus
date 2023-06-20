// const HeroContainer = styled('div')`
//   background-image: url('../public/rain.svg')
// `;

import Image from "next/image";
import image1 from '../public/images/tmp5szz2naz.png';
import image2 from '../public/images/tmpbw4bcxkf.png';
import discord from '../public/images/discord.svg';
import github from '../public/images/github.svg';
import heroicus1 from '../public/images/heroicus.png';
import Link from "next/link";
import Head from "next/head";
import {Righteous} from 'next/font/google';

const heroFont = Righteous({subsets: ["latin"], weight: "400"});


export function Index() {
  return <>
    <Head>
      <title>hērōicus - Cloud Server Rental</title>
      <meta property="og:description" name="description"
            content="Cloud computing utilizing the Fantom blockchain and AWS. Rent Stable Diffusion or Docker servers."/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content="@RandomBitsDev"/>
      <meta property="og:title" content="Heroicus - Cloud Server Rental"/>
      <meta property="og:image" content="/images/heroicus.png"/>
      <meta property="og:url" content="https://heroicus.xyz"/>
    </Head>
    <div className="bg-neutral-900 text-neutral-300 overflow-x-hidden">
      <div className="bg-neutral-950 pt-12 bg-[url('../public/images/rain.svg')]">
        <div className="py-10 flex items-center text-center justify-center">
          <div className={'tracking-wide ' + heroFont.className}>
            <div className={'text-8xl pb-10'}>hērōicus</div>
            <div className="text-5xl leading-tight">Cloud computing<br/> using NFT Rentals</div>
            <div className="mt-10 text-2xl">Powered by the Fantom Network and AWS</div>
            <Link href="/portal"
                  className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">
              Start Here
            </Link>
            <Link href="https://docs.heroicus.xyz"
                  className="ml-10 text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10">
              Docs
            </Link>

          </div>
          <div className="ml-20 hidden md:block overflow-hidden rounded-l-xl">
            <Image src={heroicus1} alt="Hero Image" width="400" height="350"
                   style={{'objectFit': 'cover', 'objectPosition': '0 0'} as any}/>
            <div className="">
              <img className="mt-10 inline-block" width="100" height="100" src="/images/fantom.svg"/>
              <img className="mt-10 inline-block ml-20" src="https://d0.awsstatic.com/logos/powered-by-aws-white.png" width="200"
                   height="72"/>
            </div>

          </div>
        </div>
      </div>

      {/*<div className="my-10 pt-14 pb-10 text-center">*/}
      {/*  <div className="text-5xl">Anonymous server rentals</div>*/}
      {/*  <div className="mt-5 text-3xl">Pay with crypto on the Fantom network</div>*/}
      {/*  <div className="mt-10">*/}
      {/*    <img className="inline-block" width="100" height="100" src="/images/fantom.svg"/>*/}
      {/*    <img className="ml-20 inline-block" src="https://d0.awsstatic.com/logos/powered-by-aws-white.png" width="200" height="72"/>*/}

      {/*  </div>*/}
      {/*</div>*/}

      <div className="container mx-auto">


        <div className="my-24">
          <div className="mr-20 invisible md:visible absolute overflow-hidden rounded-r-xl right-[60%]">
            <Image src={image1} alt="Hero Image" width="1000" height="400"
                   style={{height: '500px', 'objectFit': 'cover', 'objectPosition': '0 0'} as any}/>
          </div>
          <div className="md:ml-[30%] p-20">
            {/*<div className="text-lg">use case 1:</div>*/}
            <div className="text-5xl font-bold">Stable Diffusion</div>
            <div className="text-3xl mt-5">GPU Servers running Automatic1111 to generate AI Images</div>
            <div className="text-xl mt-5">Featuring Telsa T4 16GB GPUs</div>
            <div className="text-xl mt-3">Text-to-Image, Image-to-Image, Inpainting, ControlNet, and more</div>
            <div className="text-xl mt-3">Popular models preinstalled</div>
            {/*<Link href="/portal"*/}
            {/*      className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">*/}
            {/*  Run*/}
            {/*</Link>*/}
          </div>
        </div>

        <div className="flex mb-24">
          <div className="mr-20 invisible md:visible absolute overflow-hidden rounded-r-xl right-[60%]">
            <Image src={image2} alt="Hero Image" width="1000" height="400"
                   style={{height: '500px', 'objectFit': 'cover', 'objectPosition': '0 0'} as any}/>
          </div>
          <div className="md:ml-[30%] p-20">
            {/*<div className="text-lg">use case 1:</div>*/}
            <div className="text-5xl font-bold">Docker</div>
            <div className="text-3xl mt-5">Burstable CPU servers to host anything using docker containers</div>
            <div className="text-xl mt-5">Portainer for managing docker images/containers</div>
            {/*<Link href="/portal"*/}
            {/*      className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">*/}
            {/*  Run*/}
            {/*</Link>*/}
          </div>

        </div>

        <div className="pt-32 pb-10 mx-auto text-center">
          <a href="https://discordapp.com/users/1116077220390244394" target="_blank" className="mx-10 inline-block">
            <Image src={discord} height="50" width="50" alt="discord logo" className="inline-block mb-2"/>
            <div>Discord</div>
          </a>
          <a href="https://github.com" target="_blank" className="mx-10 inline-block">
            <Image src={github} height="50" width="50" alt="github logo" className="inline-block mb-2"/>
            <div>Github</div>
          </a>
          <div>
            <div className="mt-10">Brought to you by <a className="underline" href="https://randombits.dev">Random Bits</a></div>

          </div>
        </div>
        <div className="text-center pb-10">
          Amazon Web Services, AWS, and the Powered by AWS logo are trademarks of Amazon.com, Inc. or its affiliates.
        </div>
      </div>
    </div>
  </>
}

export default Index
