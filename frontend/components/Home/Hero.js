import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[94vh] ">
      <section className="flex flex-col gap-1 px-32 h-full justify-center items-start font-Poppins">
        <h2 className="text-white  text-9xl tracking-wide font-medium">
          ExplorerX.
        </h2>
        <p className="text-5xl pt-3  bg-gradient-to-r from-[#343434] font-medium to-[#6a6a6a] bg-clip-text text-transparent ">
          Multichain Deployer & Explorer
        </p>
      </section>
      <Image
        height={800}
        width={800}
        className='absolute -top-36 -right-10'
        src='/assets/deploy/hero.png'
      />
    </div>
  );
};

export default Hero;
