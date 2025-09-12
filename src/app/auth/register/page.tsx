'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('تمام فیلدها الزامی هستند')
      return false
    }

    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند')
      return false
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('فرمت ایمیل نامعتبر است')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // شبیه‌سازی تاخیر برای تست
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // شبیه‌سازی ثبت نام موفق
      // بعداً با API واقعی جایگزین می‌شود
      const isSuccess = Math.random() > 0.2 // 80% شانس موفقیت برای تست
      
      if (isSuccess) {
        setSuccess('حساب کاربری با موفقیت ایجاد شد!')
        
        // ذخیره اطلاعات کاربر
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', formData.email)
        localStorage.setItem('userName', formData.name)
        
        // انتقال به صفحه اصلی بعد از 2 ثانیه
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        setError('ایمیل قبلاً ثبت شده است')
      }
    } catch (error) {
      setError('خطایی در ثبت نام رخ داده است')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* هدر */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👤</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">ایجاد حساب کاربری</h1>
          <p className="mt-2 text-gray-600">اطلاعات خود را برای ثبت نام وارد کنید</p>
        </div>

        {/* فرم ثبت نام */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              نام کامل
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="نام و نام خانوادگی"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              آدرس ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="حداقل ۶ کاراکتر"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              تکرار رمز عبور
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="تکرار رمز عبور"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="mr-2 block text-sm text-gray-700">
              با <Link href="/terms" className="text-blue-600 hover:text-blue-500">قوانین و شرایط</Link> موافقم
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span>
                در حال ایجاد حساب...
              </div>
            ) : (
              'ایجاد حساب کاربری'
            )}
          </button>
        </form>

        {/* لینک ورود */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            قبلاً حساب دارید؟{' '}
            <Link href="/auth/login" className="text-blue-600 font-medium hover:text-blue-500">
              وارد شوید
            </Link>
          </p>
        </div>

        {/* اطلاعات تست برای مرحله توسعه */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">برای تست (مرحله توسعه):</h3>
          <p className="text-xs text-gray-600">• رمز عبور حداقل ۶ کاراکتر</p>
          <p className="text-xs text-gray-600">• رمز عبور و تکرار آن باید مطابقت داشته باشند</p>
          <p className="text-xs text-gray-600">• ایمیل معتبر وارد کنید</p>
        </div>
      </div>
    </div>
  )
}