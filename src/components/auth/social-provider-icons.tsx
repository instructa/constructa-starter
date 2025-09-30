import type { ComponentType, SVGProps } from 'react';
import type { SocialProvider } from 'better-auth/social-providers';
import RiGithubFill from '~icons/ri/github-fill';
import RiGoogleFill from '~icons/ri/google-fill';

export type SupportedSocialProvider = Extract<SocialProvider, 'github' | 'google'>;

export type SocialProviderDisplay = {
  readonly id: SupportedSocialProvider;
  readonly label: string;
  readonly cta: string;
  readonly icon: ComponentType<SVGProps<SVGSVGElement>>;
  readonly buttonClassName: string;
  readonly iconClassName?: string;
};

const baseButtonClass =
  'h-11 w-full justify-center gap-2 rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

export const SOCIAL_PROVIDER_DISPLAYS: Record<SupportedSocialProvider, SocialProviderDisplay> = {
  github: {
    id: 'github',
    label: 'Continue with GitHub',
    cta: 'Sign in with GitHub',
    icon: RiGithubFill,
    buttonClassName: `${baseButtonClass} border-transparent bg-[#1F2328] text-white shadow-sm hover:bg-[#161B22] focus-visible:ring-[#8C949E] dark:bg-[#0D1117] dark:hover:bg-[#161B22]`,
    iconClassName: 'size-5',
  },
  google: {
    id: 'google',
    label: 'Continue with Google',
    cta: 'Sign in with Google',
    icon: RiGoogleFill,
    buttonClassName: `${baseButtonClass} border-input bg-white text-neutral-900 shadow-sm hover:bg-neutral-100 focus-visible:ring-[#4285F4] dark:text-neutral-900`,
    iconClassName: 'size-5',
  },
};

export function resolveSocialProviderDisplays(
  providers: ReadonlyArray<SocialProvider> | undefined
): SocialProviderDisplay[] {
  if (!providers?.length) {
    return [];
  }

  return providers
    .map((provider) => SOCIAL_PROVIDER_DISPLAYS[provider as SupportedSocialProvider])
    .filter((value): value is SocialProviderDisplay => Boolean(value));
}
