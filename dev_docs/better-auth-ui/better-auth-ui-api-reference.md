# Better Auth UI Developer Guide

This guide provides a concise overview of the Better Auth UI library, focusing on key concepts and customization options.

## Core Components & Providers

- **`<AuthUIProvider>`**: The main provider for the auth system. It takes `authClient`, `additionalFields`, `localization`, and `authViewPaths` as props.
- **`<AuthView>`**: A component that renders different authentication views like sign-in, sign-up, etc.
- **`<AuthCard>`**: A card component used for authentication forms.

## Authentication Hooks (`AuthHooks`)

A set of hooks for interacting with the authentication state. These are crucial for building custom UI and logic.

- `useSession()`: Gets the current user session.
- `useIsRestoring()`: Returns `true` if the session is being restored.
- `useHasPermission(params)`: Checks if the user has a specific permission.
- `useListOrganizations()`: Lists available organizations.
- `useActiveOrganization()`: Gets the currently active organization.
- `useListApiKeys()`: Lists API keys for the user.
- `useListPasskeys()`: Lists user's passkeys.
- `useListSessions()`: Lists all active sessions for the user.
- `useListDeviceSessions()`: Lists sessions for the current device.
- `useListAccounts()`: Lists linked accounts (e.g., OAuth).
- `useInvitation(params)`: Hook for handling invitations.

## Authentication Mutations (`AuthMutators`)

Functions to modify authentication state.
- updating user information.
- revoking sessions.
- managing authentication factors.

## Customization

### Adding Custom Fields (`AdditionalField`)

Define custom fields for sign-up or user settings via the `additionalFields` prop on `AuthUIProvider`.

Example:
```tsx
const additionalFields = {
  age: {
    label: "Age",
    type: "number",
    required: true,
  },
  newsletter: {
    label: "Newsletter Opt-In",
    type: "boolean",
  }
};
```

### Text and Localization (`AuthLocalization`)

Pass an `AuthLocalization` object to `AuthUIProvider` to customize UI text and messages.

### Customizing Routes (`AuthViewPaths`)

Customize the URL paths for different authentication views (e.g., `/login` instead of `/sign-in`) by providing an `AuthViewPaths` object to `AuthUIProvider`.

### Styling with ClassNames

You can customize the appearance of most components by passing in a `classNames` object. The following components support this:
- `AuthCard` (`AuthCardClassNames`)
- `AuthForm` (`AuthFormClassNames`)
- `EmailTemplate` (`EmailTemplateClassNames`)
- `SettingsCard` (`SettingsCardClassNames`)
- `SettingsCards` (`SettingsCardsClassNames`)
- `UserAvatar` (`UserAvatarClassNames`)
- `UserButton` (`UserButtonClassNames`)

## Types and Interfaces

- **`Profile`**: Represents a user's profile data.
- **`FetchError`**: The shape of error objects from API/auth requests.
- **`ModelNames`**: Defines model name mappings for database integrations like InstantDB and Triplit.
- **`AuthView`**: An enum of available authentication views: `"signIn"`, `"signUp"`, `"magicLink"`, `"emailOTP"`, `"forgotPassword"`, `"resetPassword"`, `"signOut"`, `"settings"`, `"callback"`. 