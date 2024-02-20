import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div className="w-full container">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-primary">
          <header className="w-full">
            <div className="flex items-center justify-between p-4 text-white">
              <a href="#" className="text-lg">
                <i className="fas fa-arrow-left"></i>
              </a>
              <span className="text-sm">N</span>
              <span></span>
            </div>
          </header>

          <main className="mt-10 mb-20 text-center">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              So how does it work?
            </h2>
            <p className="text-gray-300 mb-8">
              We analyze hundreds of data points to create your unique
              astrological blueprint. This is combined with AI to tailor-make
              your astrological insights, based on your answers. We&apos;re
              going to change your relationship with astrology.
            </p>

            <button className="btn">Next</button>
          </main>
        </div>
      </div>
    </>
  );
}
