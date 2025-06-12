import {  Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { forgetPassword } from '~/lib/auth-client'

export const Route = createFileRoute({
  component: ForgotPasswordPage,
})

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true)
    setMessage("")
    
    try {
      const result = await forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      })

      if (result.error) {
        setMessage(result.error.message || "Failed to send reset email")
        setIsSuccess(false)
      } else {
        setMessage("Password reset email sent! Please check your inbox.")
        setIsSuccess(true)
      }
    } catch (error) {
      console.error(error)
      setMessage("Failed to send reset email. Please try again.")
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {message && (
                <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-destructive'}`}>
                  {message}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || isSuccess}>
                {isLoading ? "Sending..." : "Send Reset Email"}
              </Button>

              <div className="text-center text-sm">
                <Link to="/sign-in" className="text-primary hover:underline">
                  Back to Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}