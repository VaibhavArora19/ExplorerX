import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { SiHiveBlockchain } from 'react-icons/si';

const About = () => {
  const router = useRouter();

  return (
    <section className="bg-white min-h-screen rounded-t-[80px] py-[200px] px-36 flex flex-col">
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

      {/* <div className="mt-28 flex gap-20 px-16 ">
        <div className="flex-[0.5]">
          <h2 className="text-4xl font-semibold text-[#2d2d2d] font-Poppins  leading-[60px]">
            Deploy your smartcontract on Multiple{' '}
            <span className="text-purple-400">Layer2</span> chains!
          </h2>
          <p className="text-sm font-medium w-[500px] text-gray-500 mt-4">
            Tired of writing scripts and tests for deploying your
            smartcontracts?
            <br /> Use our Deployer to deploy your smartcontracts on not only
            one but multiple chain at once!
          </p>

          <button className="mt-10 flex items-center gap-2 justify-center hover:gap-4 delay-100 transition-all ease-in-out rounded-full py-4 bg-black w-[200px] text-white font-semibold font-Poppins">
            Deploy here
            <span>
              <AiOutlineArrowRight />
            </span>
          </button>
        </div>
        <div className="flex-[0.5]">
          
        </div>
      </div>

      <div className="mt-28 flex flex-row-reverse gap-20 px-16">
        <div className="flex-[0.5]">
          <h2 className="text-4xl font-semibold text-[#2d2d2d] font-Poppins  leading-[60px]">
            Manage your <span className="text-red-300">Transactions</span> and
            contracts with our own Explorer
          </h2>
          <p className="text-sm font-medium w-[500px] text-gray-500 mt-4">
            Get all the Transactions, code, ABIs, contract information,
            addressess & what not with our multichain explorer! Excited? Give it
            a shot right now.
          </p>

          <button className="mt-10 flex items-center gap-2 justify-center hover:gap-4 delay-100 transition-all ease-in-out rounded-full py-4 bg-black w-[200px] text-white font-semibold font-Poppins">
            Try Explorer
            <span>
              <AiOutlineArrowRight />
            </span>
          </button>
        </div>
        <div className="flex-[0.5]"></div>
      </div>

      <div className="mt-28 flex gap-20 px-16">
        <div className="flex-[0.5]">
          <h2 className="text-4xl font-semibold text-[#2d2d2d] font-Poppins  leading-[60px]">
            <span className="text-yellow-400">Add & Manage</span> your existing
            contracts with integrated <br /> UMA protocol
          </h2>
          <p className="text-sm font-medium w-[500px] text-gray-500 mt-4">
            Bored of using old looking explorers?{' '}
          </p>
          <p className="text-sm font-medium w-[500px] text-gray-500 mt-2">
            Add your existing contracts on our explorer and manage everything in
            a single place without any restrictions.
          </p>
          <button className="mt-10 flex items-center gap-2 justify-center hover:gap-4 delay-100 transition-all ease-in-out rounded-full py-4 bg-black w-[200px] text-white font-semibold font-Poppins">
            Add Contract
            <span>
              <AiOutlineArrowRight />
            </span>
          </button>
        </div>
        <div className="flex-[0.5]"></div>
      </div> */}

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
    </section>
  );
};

export default About;
