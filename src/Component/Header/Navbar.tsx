'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { LuLogIn, LuLogOut } from 'react-icons/lu'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import navData from '@/data/navData.json'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

import Darkened from '../Darkened/Darkened'
import type { NavItem } from '@/Types/nav'
import { signOut, useSession } from '../lib/auth-client'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { MdDashboard } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'

const data = navData as NavItem[]

const Navbar = () => {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    toast.success("Log out successfully!")
    router.push('/login')
  }
  console.log(session)

  const { i18n } = useTranslation()

  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const currentLang = (i18n.language || 'en') as 'en' | 'bn'

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'bn' : 'en'
    i18n.changeLanguage(nextLang)
  }

  return (
    <nav className="w-full border-b border-blue-800/30 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 sticky top-0 h-14 z-50 transition-colors duration-200">
      <div className=" h-full flex items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-green-700 transition-colors"
        >
          {mounted && currentLang === 'en' ? 'Sharif' : 'শরিফ'}
          <span className="text-blue-900 dark:text-white transition-colors">
            {mounted && currentLang === 'en' ? 'Academy' : 'একাডেমি'}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          {data?.map((item) => {
            const isActive = pathname === item.path

            return (
              <div key={item.id} className="relative group">
                <Link
                  href={item.path}
                  className={`px-3 py-2 flex items-center gap-1 font-bold transition-colors ${
                    isActive
                      ? 'text-emerald-500'
                      : 'text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400'
                  }`}
                >
                  {mounted ? item.Name[currentLang] : item.Name['en']}

                  {item.hasDropdown && (
                    <IoIosArrowDown className="text-xs group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {item.hasDropdown && (
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="ml-4 w-2.5 h-2.5 bg-white dark:bg-slate-900 border-t border-l border-blue-800 rotate-45 absolute -top-1 left-0 z-10"></div>
                    <div className="min-w-60 shadow-2xl rounded-xl border border-blue-800 py-2 bg-white dark:bg-slate-900">
                      {item?.subLink?.map((sub) => (
                        <div key={sub.id} className="relative group/nested">
                          <Link
                            href={sub.path}
                            className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all"
                          >
                            {mounted
                              ? sub.Name[currentLang] || sub.Name['en']
                              : sub.Name['en']}
                            {sub.hasNested && (
                              <IoIosArrowForward className="text-xs" />
                            )}
                          </Link>

                          {sub.hasNested && (
                            <div className="absolute left-full top-0 ml-1 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-300 transform translate-x-2 group-hover/nested:translate-x-0">
                              <div className="bg-white dark:bg-slate-900 min-w-60 shadow-2xl rounded-xl border border-blue-900 py-2 max-h-95 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-blue-700 scrollbar-track-transparent">
                                {sub?.nestedLink?.map((nested) => (
                                  <Link
                                    key={nested.id}
                                    href={nested.path}
                                    className="block px-5 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                                  >
                                    {mounted
                                      ? nested.Name[currentLang] ||
                                        nested.Name['en']
                                      : nested.Name['en']}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex items-center space-x-3">
          <Darkened />

          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-xs font-semibold bg-gray-800 dark:bg-slate-800 text-white border border-gray-700 dark:border-slate-700 hover:bg-gray-700 dark:hover:bg-slate-700 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
          >
            {mounted ? (currentLang === 'en' ? 'English' : 'বাংলা') : 'English'}
          </button>

          {isPending ? (
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          ) : session ? (
            <div className="relative group">
              {/* Profile Avatar */}
              <button className="flex items-center gap-2 cursor-pointer focus:outline-none">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? 'User avatar'}
                    width={36}
                    height={36}
                    className="rounded-full w-9 h-9 object-cover ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  />
                ) : (
                  // ✅ Image না থাকলে name এর প্রথম অক্ষর দেখাবে
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950">
                    <span className="text-white text-sm font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </button>

              {/* ✅ Dropdown */}
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 min-w-56">
                {/* Arrow */}
                <div className="w-2.5 h-2.5 bg-white dark:bg-slate-900 border-t border-l border-slate-200 dark:border-slate-700 rotate-45 absolute -top-1 right-3 z-10"></div>

                {/* Dropdown Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      {session?.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name ?? 'User'}
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-500 transition-colors"
                    >
                      <CgProfile className="text-base" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-500 transition-colors"
                    >
                      <MdDashboard className="text-base" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-500 transition-colors"
                    >
                      <IoSettingsOutline className="text-base" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-slate-100 dark:border-slate-800 py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full transition-colors"
                    >
                      <LuLogOut className="text-base stroke-[2.5]" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-[#008744] hover:bg-[#006f37] active:bg-[#00592c] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <span>Sign in</span>
              <LuLogIn className="text-base stroke-[2.5]" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
