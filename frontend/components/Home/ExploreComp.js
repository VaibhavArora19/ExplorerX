import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const ExploreComp = () => {
  <>
    <div className="mt-72 bg-black text-white">
      <h2 className="text-7xl font-Poppins tracking-wide leading-[90px] flex gap-4 items-center uppercase font-semibold">
        Deploy on <br /> Multichain
      </h2>

      <p className="text-md font-Poppins  w-[800px] text-gray-500 mt-4">
        Tired of writing scripts and tests for deploying your smartcontracts?
      </p>

      <p className="text-md font-Poppins  w-[500px] text-gray-500 mt-1 ">
        Use our Deployer to deploy your smartcontracts on not only one but
        multiple chain at once!
      </p>

      <button
        onClick={() => {
          router.push('/deploy');
        }}
        className="mt-10 flex items-center gap-2 justify-center hover:gap-4 delay-100 transition-all ease-in-out rounded-full py-4 bg-black w-[200px] text-white font-semibold font-Poppins"
      >
        Deploy here
        <span>
          <AiOutlineArrowRight />
        </span>
      </button>
    </div>

    <div className="relative mt-0 h-[600px]">
      <Image
        src="/img4.jpeg"
        width={400}
        height={400}
        className="absolute right-0 -top-20 rounded-md delay-100 transition-all ease-in-out hover:-top-60 hover:rotate-12"
      />
      <Image
        src="/img2.jpeg"
        width={400}
        height={400}
        className="absolute right-20 top-0 z-10 rounded-md delay-100 transition-all ease-in-out hover:-top-40 hover:rotate-12"
      />
      <Image
        src="/img3.jpeg"
        width={400}
        height={400}
        className="absolute right-40 z-10 top-20 rounded-md delay-100 transition-all ease-in-out hover:-top-20 hover:rotate-12"
      />
      <Image
        src="/img1.jpeg"
        width={400}
        height={400}
        className="absolute right-60 top-40 z-10 rounded-md delay-100 transition-all ease-in-out hover:top-0 hover:rotate-12"
      />
    </div>
  </>;
};

export default ExploreComp;
