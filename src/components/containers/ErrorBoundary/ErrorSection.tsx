import { Button, Section } from '@/components';
import Link from 'next/link';

interface Props {
  resetError?: () => void;
  heading?: string;
}

export default function ErrorSection({ resetError, heading }: Props) {
  return (
    <Section
      heading={heading ?? 'Oops! An error occured.'}
      text={'Try starting the questionnaire again.'}
    >
      <Link className={'w-full flex justify-center '} href={'/'}>
        <Button
          onClick={resetError}
          className={'w-full text-lg bg-primary-white text-violet'}
        >
          Start over
        </Button>
      </Link>
    </Section>
  );
}
