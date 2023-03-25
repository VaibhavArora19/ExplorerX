import Hero from '@/components/Home/Hero';
import Navbar from '@/components/Home/Navbar';
import Head from 'next/head';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import About from '@/components/Home/About';
import Footer from '@/components/Home/Footer';

const LandingPage = () => {
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
        <Parallax pages={5}>
          <ParallaxLayer
            sticky={{ start: 0, end: 0.6 }}
            offset={0}
            style={{ zIndex: '10' }}
          >
            <Navbar isLanding={true} />
          </ParallaxLayer>

          <ParallaxLayer
            sticky={{ start: 0, end: 0.6 }}
            offset={0}
            style={{ zIndex: '-10' }}
          >
            <Hero />
          </ParallaxLayer>

          <ParallaxLayer
            offset={0.93}
            speed={0.2}
            style={{ zIndex: '-10' }}
          >
            <About />
          </ParallaxLayer>

          <ParallaxLayer
            offset={4.3}
            speed={0.2}
          >
            <div className="m-0">
              <p className="text-white text-6xl text-center leading-[80px] tracking-wide font-Poppins">
                Built for Innovators, by Innovators
              </p>

              <p className="text-lg text-gray-400 font-Poppins text-center mt-10 w-[600px] mx-auto">
                Empowering the builders of tomorrow with ExplorerX's multi-chain
                smart contract management platform
              </p>

              <Footer />
            </div>
          </ParallaxLayer>
        </Parallax>
      </main>
    </>
  );
};

export default LandingPage;
