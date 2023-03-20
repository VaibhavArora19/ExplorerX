import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="pt-6 bg-[black] w-full px-20">
      <ul className="flex justify-between items-center font-Poppins text-gray-400">
        <h2 className="text-3xl font-semibold font-Lora text-white">EX</h2>
        <div className='flex items-center gap-20'>
          <Link className='hover:text-white' href="/deploy">Deploy</Link>
          <Link className='hover:text-white' href="/explorer">Explorer</Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
