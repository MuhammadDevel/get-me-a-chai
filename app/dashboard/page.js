"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'

const DashboardPages = () => {
  const { data: session } = useSession()
    if (!session) {
    const router = useRouter()
    router.push("Login")
    }
  return (
    <div>
      <Dashboard/>
    </div>
  )
}

export default DashboardPages
