// pages/404.tsx
import { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <div className='grid items-center text-center h-screen'>
        <div className=''>
            <h2 className='font-HelveticaMedBold text-8xl text-primary lg:text-[200px]'>404</h2>
            <h3 className='text-4xl'>Page Not Found</h3>
            <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
            <Link href="/" className='mt-6 bg-red-600 px-8 py-3 text-white inline-block rounded-xl'>
                Go back home
            </Link>
        </div>
    </div>
  );
};

export default NotFound;
