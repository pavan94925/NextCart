'use client'

import { useState } from 'react'
import { resetPassword } from '@/app/actions/authActions'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   setMessage('') // Clear previous errors

   const trimmedEmail = email.trim()
   const trimmedPassword = newPassword.trim()
   const trimmedConfirm = confirmPassword.trim()

   // Email validation
   if (!trimmedEmail) {
     setMessage('Email is required')
     return
   } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
     setMessage('Enter a valid email address')
     return
   }

   // Password validation
   if (!trimmedPassword) {
     setMessage('Password is required')
     return
   } else if (trimmedPassword.length < 6) {
     setMessage('Password must be at least 6 characters long')
     return
   } else if (!/[A-Z]/.test(trimmedPassword)) {
     setMessage('Password must contain at least one uppercase letter')
     return
   } else if (!/[a-z]/.test(trimmedPassword)) {
     setMessage('Password must contain at least one lowercase letter')
     return
   } else if (!/[0-9]/.test(trimmedPassword)) {
     setMessage('Password must contain at least one number')
     return
   } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
     setMessage('Password must contain at least one special character')
     return
   }

   // Confirm password validation
   if (trimmedPassword !== trimmedConfirm) {
     setMessage('Passwords do not match')
     return
   }

   // Submit request
   const res = await resetPassword(trimmedEmail, trimmedPassword)

   if (res.success) {
     alert('Password reset successfully!')
     router.push('/login')
   } else {
     setMessage(res.error || 'Reset failed')
   }
 }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 border rounded shadow-sm bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-type new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-red-500 font-medium text-center">{message}</p>
        )}
      </div>
    </div>
  )
}
