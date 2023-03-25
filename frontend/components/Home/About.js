import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { SiHiveBlockchain } from 'react-icons/si';

const About = () => {
  const router = useRouter();

  return (
    <section className="bg-white min-h-screen rounded-t-[80px] pt-[200px] pb-[100px] px-36 flex flex-col">
      <div className="relative ">
        <h2 className="text-6xl text-[#1e1e1e] w-[1200px] text-center font-light font-Poppins z-10  absolute left-[50%] -translate-x-[50%]">
          Making Layer2 Onboarding easier!
        </h2>
        <div className="absolute w-[1000px] h-4 bg-[#eeff00] left-[50%] -translate-x-[50%] top-[25px] "></div>
      </div>

      <div>
        <p className="w-[50%] mx-auto text-center font-Poppins text-xl mt-48">
          <span className="font-semibold">ExplorerX</span> is the modern
          solution for hassle-free smart contract deployment, management, and
          verification on multiple chains - "All at your fingertips!"
        </p>
      </div>

      {/* Deploy */}
      <>
        <div className="mt-72">
          <h2 className="text-7xl font-Poppins tracking-wide leading-[90px] flex gap-4 items-center uppercase font-semibold">
            Deploy on <br /> Multichain
          </h2>

          <p className="text-md font-Poppins  w-[800px] text-gray-500 mt-4">
            Tired of writing scripts and tests for deploying your
            smartcontracts?
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
      </>

      {/* Explorer */}
      <div className="flex flex-row-reverse  my-72 gap-10">
        <div className="flex-[0.2] h-[400px]">
          <h2 className="text-7xl font-Poppins tracking-wide leading-[90px] flex gap-4 items-center uppercase font-semibold">
            Explore Contracts <br />
          </h2>

          <p className="text-md font-Poppins   text-gray-500 mt-4">
            Got bored of using average looking blockchain explorers?
          </p>

          <p className="text-md font-Poppins  w-[500px] text-gray-500 mt-1 ">
            Try our Explorer to manage all the transactions, contracts, ABIs,
            and much more deployed by our deployer.
          </p>

          <button
            onClick={() => {
              router.push('/explorer');
            }}
            className="mt-10 flex items-center gap-2 justify-center hover:gap-4 delay-100 transition-all ease-in-out rounded-full py-4 bg-black w-[200px] text-white font-semibold font-Poppins"
          >
            Try Explorer
            <span>
              <AiOutlineArrowRight />
            </span>
          </button>
        </div>

        <div className="flex-[0.8] relative">
          <Image
            src="/assets/deploy/galaxy.jpg"
            width={1200}
            height={600}
            alt="deploy"
            className="rounded-md absolute -bottom-60 -left-20 hover:scale-105 hover:-rotate-12 transition-all ease-out"
          />
        </div>
      </div>

      <div className="mt-60 ">
        <h2 className="text-7xl font-Poppins text-center tracking-wide leading-[90px]  uppercase font-semibold">
          Add Existing Contracts!
        </h2>
        <p className="text-md font-Poppins text-center mt-10  text-gray-500">
          Manage your existing contracts with our integrated UMA protocol.
        </p>
        <p className="text-md font-Poppins text-center  text-gray-500 mt-1 ">
          Add all your existing multichain contracts and access them easily with
          our explorer. So why wait? Let's get started
        </p>

        <button
          onClick={() => {
            router.push('/addContract');
          }}
          className="mt-10 flex items-center gap-2 mx-auto justify-center hover:gap-4 delay-100 transition-all ease-in-out rounded-full py-4 bg-black w-[200px] text-white font-semibold font-Poppins"
        >
          Add Contract
          <span>
            <AiOutlineArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default About;
