# Better Auth UI Components

This document provides a summary of the React components and hooks available in the `@daveyplate/better-auth-ui` library.

---

## `<AuthUIProvider>`

The `<AuthUIProvider>` wraps your application with authentication context, providing essential hooks, settings, and methods required by authentication-related components and hooks throughout your app.

### Usage

```tsx
"use client"

import { AuthUIProvider } from '@daveyplate/better-auth-ui'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      Link={Link}
    >
      {children}
    </AuthUIProvider>
  )
}
```
**Note:** This provider is essential for most other components and hooks to function correctly.

---

## `<AuthCard />`

The `<AuthCard />` component provides an interactive and customizable authentication interface. It supports multiple authentication methods, including email/password, magic links, passkey (WebAuthn), and social providers.

### Usage

```tsx
import { AuthCard } from '@daveyplate/better-auth-ui';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard />
    </div>
  )
}
```

### Props
- `view`: Specify the initial view, e.g., `"SIGN_IN"`.
- `redirectTo`: Customize the navigation after successful authentication.
- `localization`: Pass custom text for different languages.
- `classNames`: Customize styling with TailwindCSS classes.

---

## `<SettingsCards />`

The `<SettingsCards />` component provides a plug-and-play UI for managing user account settings. It includes a comprehensive suite of manageable account settings. It automatically uses features enabled in `<AuthUIProvider>`.

### Usage

```tsx
import { SettingsCards } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
  return (
    <div className="flex justify-center py-12 px-4">
      <SettingsCards className="max-w-xl" />
    </div>
  )
}
```

### Customization
- **Overriding URL:** Use `settings.url` in `<AuthUIProvider>` to specify a custom settings page URL.
- **Styling:** Use the `classNames` prop.
- **Custom Fields:** Display custom fields by providing `additionalFields` and `settings.fields` to `<AuthUIProvider>`.

---

## Hooks

### `useAuthenticate()`

The `useAuthenticate()` hook automatically redirects unauthenticated users to the sign-in page.

#### Usage
```tsx
import { useAuthenticate } from "@daveyplate/better-auth-ui"

export default function ProtectedPage() {
    // Will redirect to sign-in if user is not authenticated
    useAuthenticate()
    
    return <div>Protected content visible only to authenticated users</div>
}
```

#### Options
- `authView`: `"signIn"` or `"signUp"`. Default is `"signIn"`.
- `enabled`: `boolean`. Default is `true`.

---

## Conditional Rendering Components

### `<SignedIn>`
Renders its children only if the user is authenticated.

### `<SignedOut>`
Renders its children only if the user is not authenticated.

### `<AuthLoading>`
Renders its children only during an authentication session loading.

#### Usage Example
```tsx
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui"

export default function Navbar() {
    return (
        <nav>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <a href="/auth/sign-in">Sign In</a>
            </SignedOut>
        </nav>
    )
}
```
---

## Redirection Components

### `<RedirectToSignIn />`
Automatically redirects unauthenticated users to the sign-in page.

### `<RedirectToSignUp />`
Automatically redirects unauthenticated users to the sign-up page.

#### Usage Example
```tsx
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"

export default function ProtectedPage({ children }) {
  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        {children}
      </SignedIn>
    </>
  )
}
```

---

## User Components

### `<UserAvatar />`
Renders a user's avatar image. If no image is available, it shows a fallback with the user's initials.

#### Usage
```tsx
import { UserAvatar } from "@daveyplate/better-auth-ui"

export default function Example() {
    const user = {
        name: "Seto",
        email: "seto@better-auth.dev",
        image: "https://better-auth-ui.com/avatars/seto.png"
    }

    return <UserAvatar user={user} />
}
```

### `<UserButton />`
A dropdown menu button that displays user account information and session management actions.

#### Usage
```tsx
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return <UserButton />;
}
```
- `size`: `"icon"` (default) or `"full"`.
- `classNames`: For custom styling.

---

## Settings Components

These components are typically used within a settings page.

### `<ChangeEmailCard />`
Allows users to change their account email address, with an optional verification step.

### `<ChangePasswordCard />`
A secure interface for users to update their account passwords. It also handles creating a password for users who signed up via a social provider.

### `<DeleteAccountCard />`
Provides a UI for users to delete their account, with optional verification.

### `<ProvidersCard />`
Manages linked social providers. Requires `providers` to be configured in `<AuthUIProvider>`.

### `<SessionsCard />`
Allows users to view and manage their active authentication sessions.

### `<TwoFactorCard />`
Manages two-factor authentication (2FA), including setup with QR codes and backup codes.

### `<UpdateAvatarCard />`
A UI for users to manage and update their avatar image. Can use a built-in uploader (base64) or a custom upload function provided in `<AuthUIProvider>`.

### `<UpdateUsernameCard />`
Enables users to update their account username.

### `<APIKeysCard />`
Provides a complete interface for managing API keys. Requires the API Key plugin to be enabled.

---

## Organization Components

These components are available when the organization plugin is enabled.

### `<OrganizationSwitcher>`
A component for switching between organizations and personal accounts, creating new organizations, and accessing settings.

### `<OrganizationMembersCard>`
A comprehensive interface for managing organization members: inviting, updating roles, and removing members.

### `<OrganizationSettingsCards>`
A set of cards for managing organization settings like logo, name, and slug.

### `<AcceptInvitationCard>`
Handles the organization invitation acceptance flow. Used on a dedicated page that gets the `invitationId` from the URL.

---

## Email Template

### `<EmailTemplate />`
A component to build responsive HTML emails for authentication flows (e.g., email verification, password reset). It should be used on the server.

#### Usage
```tsx
import { EmailTemplate } from "@daveyplate/better-auth-ui/server"

// ... inside an async function like `sendVerificationEmail`
await resend.emails.send({
    from: fromEmail,
    to: user.email,
    subject: "Verify your email address",
    react: EmailTemplate({
        action: "Verify Email",
        content: <p>Click the button below to verify your email address.</p>,
        heading: "Verify Email",
        siteName: "My App",
        baseUrl: "https://myapp.com",
        url
    })
})
``` 