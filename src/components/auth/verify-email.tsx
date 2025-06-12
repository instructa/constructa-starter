import { useState, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { verifyEmail, sendVerificationEmail } from "~/lib/auth-client"

interface VerifyEmailProps {
  email?: string
  token?: string
}

export function VerifyEmail({ email, token }: VerifyEmailProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      handleVerifyToken(token)
    }
  }, [token])

  const handleVerifyToken = async (verificationToken: string) => {
    setIsVerifying(true)
    try {
      const result = await verifyEmail({
        query: { token: verificationToken },
      })

      if (result.error) {
        setMessage(result.error.message || "Verification failed")
        setIsSuccess(false)
      } else {
        setMessage("Email verified successfully! You can now sign in.")
        setIsSuccess(true)
        setTimeout(() => {
          navigate({ to: "/sign-in" })
        }, 2000)
      }
    } catch (error) {
      console.error(error)
      setMessage("Verification failed. Please try again.")
      setIsSuccess(false)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) return
    
    setIsResending(true)
    try {
      const result = await sendVerificationEmail({
        email,
      })

      if (result.error) {
        setMessage(result.error.message || "Failed to resend verification email")
        setIsSuccess(false)
      } else {
        setMessage("Verification email sent! Please check your inbox.")
        setIsSuccess(true)
      }
    } catch (error) {
      console.error(error)
      setMessage("Failed to resend verification email. Please try again.")
      setIsSuccess(false)
    } finally {
      setIsResending(false)
    }
  }

  if (token) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            {isVerifying ? "Verifying your email..." : "Email verification status"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isVerifying ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
              {!isSuccess && (
                <Button 
                  onClick={() => handleVerifyToken(token)} 
                  className="w-full"
                  disabled={isVerifying}
                >
                  Try Again
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Check Your Email</CardTitle>
        <CardDescription>
          We've sent a verification link to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Please check your email and click the verification link to complete your registration.
        </p>
        
        {message && (
          <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email?
          </p>
          <Button 
            variant="outline" 
            onClick={handleResendVerification}
            disabled={isResending || !email}
            className="w-full"
          >
            {isResending ? "Resending..." : "Resend Verification Email"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}