// const HeroContainer = styled('div')`
//   background-image: url('../public/rain.svg')
// `;

import Image from "next/image";
import image1 from '../public/images/tmp5szz2naz.png';
import image2 from '../public/images/tmpbw4bcxkf.png';
import discord from '../public/images/discord.svg';
import github from '../public/images/github.svg';
import heroicus1 from '../public/images/heroicus1.png';
import Link from "next/link";


export function Index() {
  return <div className="bg-neutral-900 text-neutral-300 overflow-x-hidden">
    <div className="pt-12 bg-[url('../public/images/rain.svg')]">
      <div className="py-10 flex items-center text-center justify-center">
        <div className="">
          <div className="text-8xl font-bold pb-10">hērōicus</div>
          <div className="text-5xl font-semibold leading-tight">Cloud computing<br/> utilizing Fantom <br/>and AWS</div>
          {/*<Link href="/portal"*/}
          {/*      className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">*/}
          {/*  Start Here*/}
          {/*</Link>*/}
          <div className="inline-block text-xl">Coming Soon</div>
          <Link href="https://docs.heroicus.xyz"
                className="ml-10 text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10">
            Docs
          </Link>

        </div>
        <div className="ml-20 hidden md:block overflow-hidden rounded-l-xl">
          <Image src={heroicus1} alt="Hero Image" width="500" height="450"
                 style={{height: '450px', 'objectFit': 'cover', 'objectPosition': '0 0'} as any}/>
        </div>
      </div>
    </div>

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
          <div className="text-xl mt-5">Text-to-Image</div>
          <div className="text-xl mt-3">Image-to-Image</div>
          <div className="text-xl mt-3">Inpainting</div>
          <div className="text-xl mt-3">ControlNet</div>
          <div className="text-xl mt-3">Popular preinstalled models</div>
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
          <div className="text-3xl mt-5">Run burstable CPU servers to host anything using docker containers</div>
          <div className="text-xl mt-5">Portainer for managing docker images/containers</div>
          {/*<Link href="/portal"*/}
          {/*      className="text-4xl inline-block border-amber-50 border-4 px-10 py-3 bg-neutral-900 mt-10 hover:border-amber-200">*/}
          {/*  Run*/}
          {/*</Link>*/}
        </div>

      </div>

      <div className="py-24 mx-auto text-center">
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
    </div>
  </div>
}

export default Index
