import Head from 'next/head';
import WeatherData from '../components/WeatherData';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>Next.js with Tailwind CSS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Next.js with Tailwind CSS
        </h1>
        <WeatherData />
      </main>
    </div>
  );
};

export default Home;
