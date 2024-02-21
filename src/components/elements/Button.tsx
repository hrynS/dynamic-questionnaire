'use client';

export interface BaseButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: BaseButtonProps) {
  return (
    <button
      className="option w-full flex justify-center items-center px-3 py-5 border border-gray-300 rounded-xl text-center text-sm font-normal text-gray-900"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
