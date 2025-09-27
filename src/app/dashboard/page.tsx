/* eslint-disable @next/next/no-img-element */
// app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import ImageUpload from '../../../components/ImageUpload'

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const [memoryImage, setMemoryImage] = useState('')
  const [avatarImage, setAvatarImage] = useState('')

  // Define the handler function before using it
  const handleMemoryImageUpload = (url: string) => {
    setMemoryImage(url)
    console.log('Memory image uploaded:', url)
    // Here you can save to your database
  }

  const handleAvatarImageUpload = (url: string) => {
    setAvatarImage(url)
    console.log('Avatar image uploaded:', url)
    // Here you can save to your database
  }

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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">پروفایل کاربر</h2>
            <div className="space-y-4">
              <ImageUpload 
                onUploadComplete={handleAvatarImageUpload}
                folder="avatar"
                label="عکس پروفایل"
              />
              {avatarImage && (
                <div className="mt-2">
                  <img 
                    src={avatarImage} 
                    alt="Profile avatar" 
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              )}
              <p><strong>نام:</strong> {user.user_metadata?.name || 'نامشخص'}</p>
              <p><strong>ایمیل:</strong> {user.email}</p>
            </div>
          </div>

          {/* Add Memory Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">اضافه کردن خاطره جدید</h2>
            <div className="space-y-4">
              <ImageUpload 
                onUploadComplete={handleMemoryImageUpload}
                folder="memories"
                label="عکس خاطره"
              />
              
              {memoryImage && (
                <div className="mt-4">
                  <p className="text-green-600">عکس با موفقیت آپلود شد!</p>
                  <img 
                    src={memoryImage} 
                    alt="Uploaded memory" 
                    className="mt-2 max-w-full h-40 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Info Debug */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium">User Info:</h3>
          <pre className="mt-2 text-sm overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}