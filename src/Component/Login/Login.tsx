'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaEnvelope, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { signIn } from '../lib/auth-client'
import { useRouter } from 'next/navigation'

interface LoginFormData {
  email: string
  password: string
}

const Login = () => {
  const [eye, openEye] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false) 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const handelEye = () => openEye(!eye)

  const router=useRouter()
  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setLoading(true)

      const { error } = await signIn.email({
        email: data.email.trim(),
        password: data.password.trim(),
      })

      if (error) {
        toast.error(error.message ?? 'Login failed')
        return
      }

      toast.success('Logged in successfully!')
      router.push("/")
    } catch (error: unknown) {
      console.error(error)
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  const gridBgStyle: React.CSSProperties = {
    backgroundColor: '#0d0d0d',
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    minHeight: '100vh',
    padding: '40px 16px',
  }

  const cornerAccent: React.CSSProperties = {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderColor: '#aaaaaa',
    borderStyle: 'solid',
    pointerEvents: 'none',
  }

  return (
    <div className="relative flex flex-col justify-center" style={gridBgStyle}>
      {/* Logo Header */}
      <div className="grid justify-center space-y-2 mb-6">
        <Link href="/" className="flex items-center gap-2 justify-center">
          <div className="w-8 h-8 md:w-10 md:h-10 relative">
            <Image
              src="/profile-pic.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            Sharif Academy
          </h1>
        </Link>
        <h2 className="text-xl md:text-2xl text-center lg:text-3xl font-bold text-slate-100">
          Sign In! For Existing Account
        </h2>
      </div>

      <div className="relative w-full max-w-xl mx-auto shadow-2xl transition-all duration-300 bg-[#141414]/90 p-8 border border-white/10 backdrop-blur-sm">
        {/* Corner Accents */}
        <span
          style={{
            ...cornerAccent,
            top: '-1px',
            left: '-1px',
            borderWidth: '3px 0 0 3px',
          }}
        />
        <span
          style={{
            ...cornerAccent,
            top: '-1px',
            right: '-1px',
            borderWidth: '3px 3px 0 0',
          }}
        />
        <span
          style={{
            ...cornerAccent,
            bottom: '-1px',
            left: '-1px',
            borderWidth: '0 0 3px 2px',
          }}
        />
        <span
          style={{
            ...cornerAccent,
            bottom: '-1px',
            right: '-1px',
            borderWidth: '0 3px 3px 0',
          }}
        />

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4 md:space-y-6"
        >
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-100 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-100" />
              <input
                {...register('email', {
                  required: 'Email is required!',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full border text-slate-100 border-slate-700 bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-100 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-100" />
              <input
                {...register('password', {
                  required: 'Password is required!',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type={eye ? 'text' : 'password'}
                placeholder="Password..."
                className="w-full border text-white border-slate-700 bg-transparent rounded-md py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
              <div
                onClick={handelEye}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-100 cursor-pointer"
              >
                {eye ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/remember"
              className="text-sm hover:underline text-slate-400 hover:text-teal-400 transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* ✅ Submit Button — loading state সহ */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 w-full bg-[#008744] hover:bg-[#006f37] active:bg-[#00592c] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#141414] text-slate-400">OR</span>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-100 mt-4">
          Don t have an account yet?{' '}
          <Link
            href="/register"
            className="text-teal-500 font-bold cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
