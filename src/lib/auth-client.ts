import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL || 
    (import.meta.env.PROD ? window.location.origin : 'http://localhost:3000')
})

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  verifyEmail,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
} = authClient