import Hero from '@/components/Home/Hero';
import Head from 'next/head';

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
        <Hero />
      </main>
    </>
  );
};

export default LandingPage;
