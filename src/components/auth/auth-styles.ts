import type {
  AccountViewProps,
  AuthFormClassNames,
  AuthLocalization,
  AuthViewClassNames,
} from '@daveyplate/better-auth-ui';

export const formClassNames: AuthFormClassNames = {
  base: 'space-y-4',
  description: 'hidden',
  label: 'block text-sm font-medium text-foreground mb-1.5',
  input:
    'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background placeholder-muted-foreground transition-all hover:border-muted-foreground/50 bg-background text-foreground',
  error: 'text-sm text-destructive mt-1',
  primaryButton:
    'w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-[1.02] shadow-md dark:shadow-lg dark:shadow-black/20',
  secondaryButton:
    'w-full py-2.5 px-4 border bg-background text-foreground rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors',
  outlineButton:
    'text-primary font-medium hover:text-primary/80 underline decoration-primary/30 underline-offset-2',
  forgotPasswordLink:
    'text-primary font-medium hover:text-primary/80 underline decoration-primary/30 underline-offset-2',
  providerButton:
    'w-full py-2.5 px-4 border rounded-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center gap-2 shadow-sm dark:shadow-md dark:shadow-black/10 bg-background',
  icon: 'w-5 h-5',
  checkbox: 'rounded border-input text-primary focus:ring-ring',
  otpInputContainer: 'flex gap-2 justify-center',
  otpInput:
    'w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background hover:border-muted-foreground/50 transition-all bg-background text-foreground',
  qrCode: 'mx-auto',
  button: 'inline-flex items-center justify-center',
};

export const authViewClassNames: AuthViewClassNames = {
  base: 'w-full max-w-md mx-auto bg-background rounded-xl shadow-lg dark:shadow-2xl dark:shadow-black/20 border',
  header: 'text-center pb-2',
  title: 'text-2xl font-bold text-foreground',
  description: 'text-sm text-muted-foreground mt-2',
  content: 'px-8 pb-8',
  footer: 'text-center space-y-3',
  footerLink:
    'text-primary font-medium hover:text-primary/80 underline decoration-primary/30 underline-offset-2',
  continueWith: 'text-muted-foreground text-xs uppercase tracking-wide',
  separator: 'relative text-center my-6 text-muted-foreground',
  form: formClassNames,
};

export const authLocalizationOverrides: Partial<AuthLocalization> = {
  SIGN_IN: 'Welcome back',
  SIGN_UP: 'Create your account',
  SIGN_IN_DESCRIPTION: 'Enter your credentials to access your account',
  SIGN_UP_DESCRIPTION: 'Get started with a new account',
  FORGOT_PASSWORD: 'Forgot password?',
  FORGOT_PASSWORD_DESCRIPTION: "Enter your email and we'll send you a reset link",
  RESET_PASSWORD: 'Reset password',
  RESET_PASSWORD_DESCRIPTION: 'Enter your new password below',
  DONT_HAVE_AN_ACCOUNT: "Don't have an account?",
  ALREADY_HAVE_AN_ACCOUNT: 'Already have an account?',
  MAGIC_LINK: 'Sign in with magic link',
  MAGIC_LINK_DESCRIPTION:
    "We'll email you a secure link. Check your inbox and click the link to continue.",
  MAGIC_LINK_EMAIL: 'Check your email for the magic link.',
  SIGN_IN_ACTION: 'Sign in',
  SIGN_UP_ACTION: 'Continue',
  FORGOT_PASSWORD_ACTION: 'Send reset link',
  RESET_PASSWORD_ACTION: 'Reset password',
  TERMS_OF_SERVICE: 'Terms of Service',
  PRIVACY_POLICY: 'Privacy Policy',
  REQUEST_FAILED: 'An error occurred. Please try again.',
  OR_CONTINUE_WITH: 'Or continue with',
  SIGN_IN_WITH: 'Continue with',
};

// Container styling for auth pages
export const authContainerClassName = authViewClassNames.base!;
export const authHeaderClassName = authViewClassNames.header;
export const authTitleClassName = authViewClassNames.title;
export const authDescriptionClassName = authViewClassNames.description;

const accountCardBase =
  'border border-border/60 bg-background/90 backdrop-blur rounded-xl shadow-sm';

export const accountViewClassNames: NonNullable<AccountViewProps['classNames']> = {
  base: 'flex-1',
  cards: 'flex flex-col gap-4 md:gap-6',
  card: {
    base: accountCardBase,
    header: 'px-4 py-4 border-b border-border/70',
    title: 'text-base font-semibold',
    description: 'text-sm text-muted-foreground',
    content: 'px-4',
    footer: 'px-4 pb-4',
    primaryButton:
      'inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90',
    secondaryButton:
      'inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted',
    outlineButton:
      'inline-flex items-center justify-center text-sm font-medium text-primary underline-offset-4 hover:underline',
    button:
      'inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-muted',
    error: 'text-sm text-destructive',
    instructions: 'text-sm text-muted-foreground',
  },
};
