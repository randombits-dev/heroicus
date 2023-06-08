// const HeroContainer = styled('div')`
//   background-image: url('../public/rain.svg')
// `;

import Image from "next/image";
import heroImage from '../public/images/tmp5szz2naz.png';
import discord from '../public/images/discord.svg';
import github from '../public/images/github.svg';
import Link from "next/link";
import {styled} from "goober";

const HeroImageContainer = styled('div')`
  left: 60%;
`;

export function Index() {
  return <div className="bg-neutral-900 text-neutral-300 overflow-x-hidden">
    <div className="container mx-auto ">
      <div className="pt-12 bg-[url('../public/images/rain.svg')]">
        <div className="p-10 flex">
          <div>
            <div className="text-8xl font-bold pb-10">hērōicus</div>
            <div className="text-6xl font-semibold">Cloud computing<br/> utilizing Fantom <br/>and AWS</div>
            <Link href="/portal"
                  className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">
              Start Here
            </Link>
            <Link href="/DocsPage" className="ml-10 text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10">
              Docs
            </Link>
          </div>
          <HeroImageContainer className="ml-20 invisible md:visible absolute overflow-hidden rounded-l-xl">
            <Image src={heroImage} alt="Hero Image" width="1000" height="400"
                   style={{height: '500px', 'object-fit': 'cover', 'object-position': '0 0'}}/>
          </HeroImageContainer>
        </div>
      </div>

      <div className="flex mt-24">
        <div className="mr-20">
          <Image src={heroImage} alt="Hero Image"/>
        </div>
        <div>
          {/*<div className="text-lg">use case 1:</div>*/}
          <div className="text-5xl font-bold">Stable Diffusion</div>
          <div className="text-3xl mt-5">GPU Servers running Automatic1111 to generate AI Images</div>
          <div className="text-xl mt-5">ControlNet</div>
          <div className="text-xl mt-3">Models: StableDiffusionv2.1, Deliberate, InkPunk</div>
        </div>
      </div>

      <div className="flex mt-24">
        <div className="mr-20">
          <Image src={heroImage} alt="Hero Image"/>
        </div>
        <div>
          {/*<div className="text-lg">use case 1:</div>*/}
          <div className="text-5xl font-bold">Docker</div>
          <div className="text-3xl mt-5">Run burstable CPU servers to host anything using docker containers</div>
          <div className="text-xl mt-5">Portainer for managing docker images/containers</div>
        </div>
      </div>

      <div className="py-24 mx-auto text-center">
        <a href="https://discordapp.com/users/1116077220390244394" target="_blank" className="inline-block">
          <Image src={discord} height="50" width="50" alt="discord logo"/>
        </a>
        <a href="https://github.com" target="_blank" className="ml-20 inline-block">
          <Image src={github} height="50" width="50" alt="github logo"/>
        </a>
      </div>
    </div>
  </div>
}

export default Index
