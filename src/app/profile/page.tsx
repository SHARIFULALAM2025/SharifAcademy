"use client"
import { useSession } from '@/Component/lib/auth-client'
import Image from 'next/image'
import React from 'react'

const ProfilePage = () => {
  const { data: session, isPending, error } = useSession()
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
  // 1. Loading State
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  // 2. Unauthenticated / Error State
  if (error || !session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to view your professional profile.
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Sign In
          </button>
        </div>
      </div>
    )
  }

  const { user } = session

  return (
    <div
      style={gridBgStyle}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r border-b border-gray-100 dark:border-gray-700 from-blue-600 to-indigo-700 px-8 flex items-end">
          {/* Placeholder for future banner customization */}
        </div>

        {/* Profile Details Section */}
        <div className="px-8 pb-8 relative">
          {/* Avatar / Image */}
          <div className="absolute -top-16 left-8">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User Avatar'}
                width={112}
                height={112}
                className="rounded-xl border-4 border-white dark:border-gray-800 object-cover shadow-md"
              />
            ) : (
              <div className="w-28 h-28 rounded-xl border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-md text-3xl font-bold text-gray-500">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>

          {/* Meta Info */}
          <div className="pt-16 sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name || 'Professional Member'}
                  lock
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Verified Pro
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {user.email}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          {/* Industry & Account Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Account Overview
              </h3>
              <div className="space-y-3 bg-gray-50 dark:bg-gray-850 p-4 rounded-xl border border-gray-100 dark:border-gray-750">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    User ID
                  </span>
                  <span className="font-mono text-gray-900 dark:text-white truncate max-w-45">
                    {user.id}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Role</span>
                  <span className="text-gray-900 dark:text-white font-medium capitalize">
                    {/* Fallback to 'Member' if your auth doesn't return role yet */}
                    {(user as any).role || 'Professional'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Professional Status
              </h3>
              <div className="space-y-3 bg-gray-50 dark:bg-gray-850 p-4 rounded-xl border border-gray-100 dark:border-gray-750">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Industry Ecosystem
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Enterprise Tech
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Account Type
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Corporate Tier
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
