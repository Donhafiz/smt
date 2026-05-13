import { ReactNode } from 'react'

interface Props {
  role: string
  allowed: string[]
  children: ReactNode
}

export default function RoleGuard({
  role,
  allowed,
  children
}: Props) {

  if (!allowed.includes(role)) {
    return null
  }

  return <>{children}</>
}