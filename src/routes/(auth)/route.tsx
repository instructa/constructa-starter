import {  Outlet } from '@tanstack/react-router'
import { UnauthenticatedRoute } from '~/components/auth/unauthenticated-route'

export const Route = createFileRoute({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <UnauthenticatedRoute>
      <Outlet />
    </UnauthenticatedRoute>
  )
}