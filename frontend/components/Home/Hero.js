import React from 'react';

const Hero = () => {
  return (
    <section className="flex flex-col gap-1 h-[100vh] px-32 justify-center items-start font-Poppins">
      <h2 className="text-white text-9xl tracking-wide font-medium">
        ExplorerX
      </h2>
      <p className="text-9xl pb-3  bg-gradient-to-r from-[#343434] font-medium to-[#6a6a6a] bg-clip-text text-transparent ">
        Multichain Deployer
      </p>
    </section>
  );
};

export default Hero;
