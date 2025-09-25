"use client"

import { useAuth } from '../../../contexts/AuthContext'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/signin'
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/signin'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Welcome, {user.user_metadata?.name || user.email}!</h2>
          <p className="mt-2 text-gray-600">You are successfully signed in.</p>
          
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-medium">User Info:</h3>
            <pre className="mt-2 text-sm">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}