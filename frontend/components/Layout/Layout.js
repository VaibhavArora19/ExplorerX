import { useRouter } from 'next/router';
import React from 'react';
import Navbar from '../Home/Navbar';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      {router.pathname === '/addContract' && (
        <Navbar bgColor={'bg-[#111111]'} />
      )}

      {router.pathname === '/explorer' && <Navbar bgColor={'bg-[black]'} />}

      {router.pathname === '/deploy' && <Navbar bgColor={'bg-[#171717]'} />}

      {children}
    </div>
  );
};

export default Layout;
