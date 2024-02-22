import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import ChevronSvg from '../../../public/chevron.svg';
import LogoDarkSvg from '../../../public/logo_dark.svg';
import LogoLightSvg from '../../../public/logo_light.svg';

export interface PageHeaderProps {
  isNavigateable?: boolean;
  isLight?: boolean;
}

export default function PageHeader({
  isNavigateable,
  isLight,
}: PageHeaderProps) {
  const router = useRouter();

  const LogoSvg = isLight ? LogoLightSvg : LogoDarkSvg;

  return (
    <header className="absolute top-0 w-full max-w-screen-2xl flex items-center justify-center py-4 px-3 sm:py-5 sm:px-4">
      {isNavigateable ? (
        <button onClick={() => router.back()} className="absolute left-4">
          <ChevronSvg
            fill={
              isLight
                ? theme.colors['primary-white']
                : theme.colors['primary-black']
            }
            width={24}
            height={24}
          />
        </button>
      ) : null}
      <LogoSvg alt="logo" width={16} height={16} />
    </header>
  );
}
