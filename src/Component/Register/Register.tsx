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
      const { error } = await signUp.email({
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

  // Corner accents now echo manuscript-illumination corners, in the
  // theme's --accent (Antique Gilt) instead of a generic grey.
  const cornerAccent: React.CSSProperties = {
    position: 'absolute',
    width: '32px',
    height: '32px',
    borderColor: 'var(--accent)',
    borderStyle: 'solid',
    pointerEvents: 'none',
  }

  return (
    <div className="relative bg-background bg-star-pattern min-h-screen px-4 py-10">
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
          <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            Sharif Academy
          </h1>
        </Link>
        <h2 className="font-display text-xl md:text-2xl text-center lg:text-3xl font-bold text-foreground">
          Sign Up! For New Account
        </h2>
      </div>

      <div className="relative w-full max-w-xl mx-auto shadow-2xl transition-all duration-300 bg-card/95 p-8 border border-border backdrop-blur-md rounded-lg">
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
            <label className="block text-sm font-semibold text-foreground mb-1">
              Name <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="Enter Name"
                className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
            {errors.name && (
              <span className="text-danger text-xs mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Email <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
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
                className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
            {errors.email && (
              <span className="text-danger text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Password <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
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
                  className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-accent transition"
                />
                <div
                  onClick={handelEye}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {errors.password && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  {...register('ConfirmPassword', {
                    required: 'Confirm Password is required!',
                  })}
                  type={eye ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-accent transition"
                />
                <div
                  onClick={handelEye}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {errors.ConfirmPassword && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.ConfirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Profile Image Field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Profile <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <CgProfile className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                {...register('image', {
                  required: 'Profile image is required!',
                })}
                type="file"
                className="w-full border text-foreground border-border bg-transparent rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent transition file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-accent-foreground hover:file:opacity-90"
              />
            </div>
            {errors.image && (
              <span className="text-danger text-xs mt-1 block">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-accent border-border rounded focus:ring-accent"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-foreground">
              Remember Me
            </label>
          </div>

          {/* ✅ Submit Button — loading state সহ */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 w-full bg-primary hover:opacity-90 active:opacity-80 text-primary-foreground text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted">OR</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Facebook />
          <Google />
        </div>

        <p className="text-center text-sm text-foreground mt-4">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-accent font-bold cursor-pointer hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
