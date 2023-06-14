// const HeroContainer = styled('div')`
//   background-image: url('../public/rain.svg')
// `;

import Image from "next/image";
import image0 from '../public/images/4.png';
import image1 from '../public/images/tmp5szz2naz.png';
import image2 from '../public/images/tmpbw4bcxkf.png';
import discord from '../public/images/discord.svg';
import github from '../public/images/github.svg';
import Link from "next/link";


export function Index() {
  return <div className="bg-neutral-900 text-neutral-300 overflow-x-hidden">
    <div className="pt-12 bg-[url('../public/images/rain.svg')]">
      <div className="py-10 flex items-center text-center justify-center">
        <div className="">
          <div className="text-8xl font-bold pb-10">hērōicus</div>
          <div className="text-6xl font-semibold leading-tight">Cloud computing<br/> utilizing Fantom <br/>and AWS</div>
          <Link href="/portal"
                className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">
            Start Here
          </Link>
          <Link href="/DocsPage" className="ml-10 text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10">
            Docs
          </Link>
        </div>
        <div className="ml-20 hidden md:block overflow-hidden rounded-l-xl">
          <Image src={image0} alt="Hero Image" width="500" height="400"
                 style={{height: '400px', 'object-fit': 'cover', 'object-position': '0 0'}}/>
        </div>
      </div>
    </div>

    <div className="container mx-auto">

      <div className="my-24">
        <div className="mr-20 invisible md:visible absolute overflow-hidden rounded-r-xl right-[60%]">
          <Image src={image1} alt="Hero Image" width="1000" height="400"
                 style={{height: '500px', 'object-fit': 'cover', 'object-position': '0 0'}}/>
        </div>
        <div className="md:ml-[30%] p-20">
          {/*<div className="text-lg">use case 1:</div>*/}
          <div className="text-5xl font-bold">Stable Diffusion</div>
          <div className="text-3xl mt-5">GPU Servers running Automatic1111 to generate AI Images</div>
          <div className="text-xl mt-5">ControlNet</div>
          <div className="text-xl mt-3">Models: StableDiffusionv2.1, Deliberate, InkPunk</div>
          <Link href="/portal"
                className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">
            Run
          </Link>
        </div>
      </div>

      <div className="flex mb-24">
        <div className="mr-20 invisible md:visible absolute overflow-hidden rounded-r-xl right-[60%]">
          <Image src={image2} alt="Hero Image" width="1000" height="400"
                 style={{height: '500px', 'object-fit': 'cover', 'object-position': '0 0'}}/>
        </div>
        <div className="md:ml-[30%] p-20">
          {/*<div className="text-lg">use case 1:</div>*/}
          <div className="text-5xl font-bold">Docker</div>
          <div className="text-3xl mt-5">Run burstable CPU servers to host anything using docker containers</div>
          <div className="text-xl mt-5">Portainer for managing docker images/containers</div>
          <Link href="/portal"
                className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">
            Run
          </Link>
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
