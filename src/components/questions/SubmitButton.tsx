'use client';

import Button, { BaseButtonProps } from '../elements/Button';

interface SubmitButtonProps extends BaseButtonProps {
  nextStep: string;
}

export default function SubmitButtonProps({
  label,
  onClick,
  nextStep,
}: SubmitButtonProps) {
  const handleSubmitClick = () => {};

  return <Button label={label} onClick={} />;
}
