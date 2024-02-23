import { PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
  heading: string;
  text?: string;
  className?: string;
}

export default function Section({
  heading,
  text,
  className = '',
  children,
}: SectionProps) {
  return (
    <section
      className={`flex flex-col items-center text-center pt-4 gap-y-7 ${className}`}
    >
      <h1 className="text-primary-white text-2xl font-bold mb-5">{heading}</h1>
      <p className="text-primary-white font-normal text-center text-sm leading-6 mb-10">
        {text}
      </p>
      {children}
    </section>
  );
}
