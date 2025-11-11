'use client'

import { useState } from 'react'
import { loginUser } from '@/app/actions/authActions'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  type Errors = {
    email?: string
    password?: string
  }
  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = () => {
    const newErrors: Errors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setMessage('')
    setErrors({})

    if (!validateForm()) {
      setMessage('Please fix the errors below')
      return
    }

    setIsLoading(true)

    try {
      const result = await loginUser({ email, password })

      if (result.success) {
        setMessage('Login successful!')
        router.push('/dashboard')
        router.refresh()
      } else {
        setMessage(result.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value.toLowerCase())
    if (errors.email) {
      setErrors({ ...errors, email: '' })
    }
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
    if (errors.password) {
      setErrors({ ...errors, password: '' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col min-h-screen">
        {/* Login Form Section - Centered on mobile */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">E-Cart</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateForm()}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => validateForm()}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-orange-600 hover:text-orange-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white font-bold py-3 rounded-lg ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-600'
                }`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              {/* Links */}
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Forgot your password?{' '}
                  <a
                    href="/forgot-password"
                    className="text-orange-600 underline hover:text-orange-800"
                  >
                    Reset here
                  </a>
                </p>

                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a
                    href="/register"
                    className="text-orange-600 underline hover:text-orange-600"
                  >
                    Create Account
                  </a>
                </p>
              </div>

              {/* Message */}
              {message && (
                <p
                  className={`text-center font-semibold ${
                    message.includes('successful')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
