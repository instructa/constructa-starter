
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { sendVerificationEmail } from '~/lib/auth-client'

export const Route = createFileRoute({
  component: ResendVerificationPage,
})

const resendSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ResendFormData = z.infer<typeof resendSchema>

function ResendVerificationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendFormData>({
    resolver: zodResolver(resendSchema),
  })

  const onSubmit = async (data: ResendFormData) => {
    setIsLoading(true)
    setMessage("")
    
    try {
      const result = await sendVerificationEmail({
        email: data.email,
      })

      if (result.error) {
        setMessage(result.error.message || "Failed to send verification email")
        setIsSuccess(false)
      } else {
        setMessage("Verification email sent! Please check your inbox.")
        setIsSuccess(true)
      }
    } catch (error) {
      console.error(error)
      setMessage("Failed to send verification email. Please try again.")
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
            <CardTitle>Resend Verification Email</CardTitle>
            <CardDescription>
              Enter your email address to receive a new verification link
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Verification Email"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}