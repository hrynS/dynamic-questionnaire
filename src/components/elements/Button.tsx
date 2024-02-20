'use client';

export interface BaseButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: BaseButtonProps) {
  return (
    <button
      className="block w-full text-left py-2 px-4 bg-blue-100 text-blue-800 rounded-md border border-blue-200 focus:outline-none focus:border-blue-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
