'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CgProfile } from 'react-icons/cg'
import { FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa'
import Facebook from '../Facebook/Facebook'
import Google from '../Google/Google'
import { uploadImage } from '../lib/uploadImage'
import { signUp } from '../lib/auth-client'


interface RegisterFormData {
  name: string
  email: string
  password: string
  ConfirmPassword: string
  image: FileList
}

const Register = () => {
  const [eye, openEye] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false) // ✅ loading state
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const handelEye = () => openEye(!eye)

  const handleSignup = async (info: RegisterFormData) => {
    try {
      setLoading(true)
      const { name, email, password, ConfirmPassword, image } = info

      const trimmedEmail = email.trim()
      const trimmedPassword = password.trim()

      // ✅ Password match check
      if (trimmedPassword !== ConfirmPassword.trim()) {
        toast.error('Passwords do not match')
        return
      }

      // ✅ Image upload
      if (!image || image.length === 0) {
        toast.error('Please select an image')
        return
      }

      const userImage = await uploadImage(image[0])
      if (!userImage) {
        toast.error('Image upload failed')
        return
      }

      // ✅ Better Auth দিয়ে signup
      const {  error } = await signUp.email({
        name,
        email: trimmedEmail,
        password: trimmedPassword,
        image: userImage, // uploaded image URL
      })

      if (error) {
        toast.error(error.message ?? 'Registration failed')
        return
      }

      toast.success('Registered successfully!')
      router.push('/')
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
    width: '32px',
    height: '32px',
    borderColor: '#aaaaaa',
    borderStyle: 'solid',
    pointerEvents: 'none',
  }

  return (
    <div className="relative" style={gridBgStyle}>
      {/* Logo Header */}
      <div className="grid justify-center space-y-2 mb-6">
        <Link href="/" className="flex items-center gap-2 justify-center">
          <figure className="w-8 h-8 md:w-10 md:h-10 relative">
            <Image
              src="/profile-pic.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </figure>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            Sharif Academy
          </h1>
        </Link>
        <h2 className="text-xl md:text-2xl text-center lg:text-3xl font-bold text-slate-100">
          Sign Up! For New Account
        </h2>
      </div>

      <div className="relative w-full max-w-xl mx-auto shadow-2xl transition-all duration-300 bg-[#141414]/90 p-8 border border-white/10 backdrop-blur-md">
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
          onSubmit={handleSubmit(handleSignup)}
          className="space-y-4 md:space-y-6"
        >
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-100 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-100" />
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="Enter Name"
                className="w-full border text-slate-100 border-slate-700 bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

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

          {/* Password Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-semibold text-slate-100 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-100" />
                <input
                  {...register('ConfirmPassword', {
                    required: 'Confirm Password is required!',
                  })}
                  type={eye ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full border text-white border-slate-700 bg-transparent rounded-md py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
                <div
                  onClick={handelEye}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-100 cursor-pointer"
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {errors.ConfirmPassword && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.ConfirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Profile Image Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-100 mb-1">
              Profile <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CgProfile className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-100" />
              <input
                {...register('image', {
                  required: 'Profile image is required!',
                })}
                type="file"
                className="w-full border text-slate-100 border-slate-700 bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
            </div>
            {errors.image && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-slate-100">
              Remember Me
            </label>
          </div>

          {/* ✅ Submit Button — loading state সহ */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 w-full bg-[#008744] hover:bg-[#006f37] active:bg-[#00592c] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#141414] text-slate-400">OR</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Facebook />
          <Google />
        </div>

        <p className="text-center text-sm text-slate-100 mt-4">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-teal-500 font-bold cursor-pointer hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
