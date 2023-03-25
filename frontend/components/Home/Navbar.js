import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Navbar = ({ bgColor, isLanding = false }) => {
  const router = useRouter();
  return (
    <nav className={`pt-6 ${bgColor} w-full px-20 z-10 fixed`}>
      <ul className="flex justify-between items-center font-Poppins ">
        <h2
          onClick={() => {
            router.push('/');
          }}
          className="text-3xl font-semibold font-Lora text-white cursor-pointer"
        >
          EX.
        </h2>
        <div className="flex items-center gap-20 text-white">
          <Link
            className="hover:scale-105"
            href="/"
          >
            Home
          </Link>
          <Link
            className="hover:scale-105"
            href="/deploy"
          >
            Deploy
          </Link>

          <Link
            className="hover:scale-105"
            href="/addContract"
          >
            Add Contract
          </Link>
          <Link
            className="hover:scale-105"
            href="/explorer"
          >
            Explorer
          </Link>
        </div>

        {isLanding && (
          <button onClick={() => {
            router.push('/explorer')
          }} className=" flex items-center gap-2 justify-center hover:scale-110 delay-100 transition-all ease-in-out rounded-full py-4 bg-white w-[200px] font-semibold font-Poppins">
            Get Started
            <span>
              <AiOutlineArrowRight />
            </span>
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
