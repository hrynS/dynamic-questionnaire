import { Open_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { PageHeader } from '../components';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={' flex flex-col items-center justify-center'}>
      <PageHeader />
      <main
        className={`w-full flex flex-col items-center justify-between py-5 ${openSans.className}`}
      >
        {children}
      </main>
    </div>
  );
}
