'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // شبیه‌سازی تاخیر برای تست
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // اعتبارسنجی ساده (بعداً با API واقعی جایگزین می‌شود)
      const isValid = email === 'user@example.com' && password === 'password'
      
      if (isValid) {
        // ذخیره وضعیت ورود در localStorage
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', email)
        router.push('/')
        router.refresh() // بروزرسانی صفحه
      } else {
        setError('ایمیل یا رمز عبور اشتباه است')
      }
    } catch (error) {
      setError('خطایی در ورود رخ داده است')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* هدر */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">ورود به حساب</h1>
          <p className="mt-2 text-gray-600">لطفا اطلاعات حساب خود را وارد کنید</p>
        </div>

        {/* فرم ورود */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              آدرس ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700">
                مرا به خاطر بسپار
              </label>
            </div>

            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span>
                در حال ورود...
              </div>
            ) : (
              'ورود به حساب'
            )}
          </button>
        </form>

        {/* لینک ثبت نام */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            حساب کاربری ندارید؟{' '}
            <Link href="/auth/register" className="text-blue-600 font-medium hover:text-blue-500">
              ایجاد حساب کاربری
            </Link>
          </p>
        </div>

        {/* اطلاعات تست برای مرحله توسعه */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">برای تست (مرحله توسعه):</h3>
          <p className="text-xs text-gray-600">ایمیل: user@example.com</p>
          <p className="text-xs text-gray-600">رمز عبور: password</p>
        </div>
      </div>
    </div>
  )
}