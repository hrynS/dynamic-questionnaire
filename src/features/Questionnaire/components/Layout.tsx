import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { Open_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { PageHeader, PageHeaderProps } from '@/components';
import { useSelector } from 'react-redux';

const openSans = Open_Sans({
  subsets: ['latin'],
});

interface Props extends PropsWithChildren {
  mainClassName?: string;
  headerProps?: { isLight?: boolean };
}

export default function Layout({
  children,
  mainClassName,
  headerProps,
}: Props) {
  const questionnaire = useSelector(questionnaireSelector);
  const isQuestionnaireNavigateable = !!Object.keys(questionnaire).length;

  return (
    <div className={'h-screen flex flex-col items-center justify-center'}>
      <PageHeader
        {...headerProps}
        isNavigateable={isQuestionnaireNavigateable}
      />
      <main
        className={`h-full w-full flex flex-col items-center justify-between sm:pt-14 pt-12 ${mainClassName} ${openSans.className}`}
      >
        {children}
      </main>
    </div>
  );
}
