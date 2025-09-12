'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      const email = localStorage.getItem('userEmail') || ''
      const name = localStorage.getItem('userName') || ''
      
      setIsLoggedIn(loggedIn)
      setUserEmail(email)
      setUserName(name)
      setIsLoading(false)
      
      if (!loggedIn) {
        router.push('/auth/login')
      }
    }

    checkAuth()
    
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    setIsLoggedIn(false)
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-2xl mb-2">⏳</div>
          <p>در حال بررسی وضعیت ورود...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* هدر */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">داشبورد کاربری</h1>
              {userName && (
                <p className="text-sm text-gray-600">خوش آمدید، {userName}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
                <span className="ml-2">📤</span>
                آپلود عکس
              </button>
              
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 flex items-center"
              >
                <span className="ml-1">🚪</span>
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* محتوای اصلی */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {userName ? `سلام ${userName}!` : 'خوش آمدید!'}
          </h2>
          <p className="text-gray-600 mb-6">حساب کاربری شما با موفقیت ایجاد شد</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <span className="text-2xl mb-3 block">📷</span>
              <h3 className="font-semibold mb-2">شروع کنید</h3>
              <p className="text-sm text-gray-600">اولین عکس خود را آپلود کنید</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <span className="text-2xl mb-3 block">👀</span>
              <h3 className="font-semibold mb-2">گالری شما</h3>
              <p className="text-sm text-gray-600">عکس‌های خود را مدیریت کنید</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <span className="text-2xl mb-3 block">⚙️</span>
              <h3 className="font-semibold mb-2">تنظیمات</h3>
              <p className="text-sm text-gray-600">حساب خود را شخصی‌سازی کنید</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              شروع کار با گالری
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}