'use client';

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='text-center'>
      <h2 className='mb-5 mt-20 text-3xl'>{`${error.message || 'Something went wrong!'}`}</h2>
      <Button variant={'link'} onClick={() => reset()} className='mt-6 bg-red-600 px-8 py-3 text-white inline-block rounded-xl'>Try again</Button>
    </div>
  );
}
