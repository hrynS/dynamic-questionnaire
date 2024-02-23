import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface BaseButtonProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  className = '',
  onClick,
}: BaseButtonProps) {
  return (
    <button
      className={twMerge(
        'flex justify-center items-center px-3 py-5 border border-gray-300 rounded-xl \n' +
          '      text-center text-sm font-normal text-primary-black hover:bg-gray-300 active:bg-gradient-primary' +
          ' active:text-primary-white ',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
