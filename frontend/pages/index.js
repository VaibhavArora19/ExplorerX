import Hero from '@/components/Home/Hero';
import Navbar from '@/components/Home/Navbar';
import Head from 'next/head';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import About from '@/components/Home/About';
import { useEffect, useState } from 'react';
import ExploreComp from '@/components/Home/ExploreComp';

const LandingPage = () => {
  // const [coords, setCoords] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const handleWindowMouseMove = (event) => {
  //     setCoords({
  //       x: event.clientX,
  //       y: event.clientY,
  //     });
  //   };
  //   window.addEventListener('mousemove', handleWindowMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleWindowMouseMove);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>ExplorerX</title>
        <meta
          name="description"
          content="A blockchain explorer cum deployer"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main className="min-h-screen bg-[black]">
        <Parallax pages={4}>
          <ParallaxLayer
            sticky={{ start: 0, end: 0.6 }}
            offset={0}
            style={{ zIndex: '10' }}
          >
            <Navbar isLanding={true} />
          </ParallaxLayer>

          <ParallaxLayer
            // speed={}
            sticky={{ start: 0, end: 0.6 }}
            offset={0}
            style={{ zIndex: '-10' }}
            // factor={1}
          >
            {/* <Navbar /> */}
            <Hero />
          </ParallaxLayer>

          <ParallaxLayer
            offset={0.93}
            speed={0.2}
            // sticky={{start: 1.6, end: 2.2}}
            style={{ zIndex: '-10' }}
          >
            <About />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.75}
            speed={0.6}
          >
            {/* <About /> */}
            <div className="h-screen bg-black rounded-t-[80px]">
              <ExploreComp/>
            </div>
          </ParallaxLayer>
        </Parallax>
      </main>
    </>
  );
};

export default LandingPage;
