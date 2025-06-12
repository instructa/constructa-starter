import { useAuth } from './auth-provider'
import { Navigate } from '@tanstack/react-router'

interface UnauthenticatedRouteProps {
  children: React.ReactNode
  fallback?: string
}

export function UnauthenticatedRoute({ children, fallback = '/dashboard' }: UnauthenticatedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={fallback} />
  }

  return <>{children}</>
}