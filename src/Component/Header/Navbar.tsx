'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { LuLogIn, LuLogOut } from 'react-icons/lu'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import navData from '@/data/navData.json'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'

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
    toast.success('Log out successfully!')
    router.push('/login')
  }
  console.log(session)

  const { i18n } = useTranslation()

  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // মোবাইল/ট্যাবলেট মেনু স্টেট (lg-এর নিচে সব ডিভাইসের জন্য)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMobileId, setOpenMobileId] = useState<string | number | null>(null)

  // ✅ লিন্ট এরর ফিক্স: রেন্ডার ফেজেই পাথনেম ট্র্যাকিং স্টেট রাখা
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  // ✅ রেন্ডার পাসেই পাথনেম বদলানো চেক করে মোবাইল মেনু বন্ধ করা (No useEffect needed)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
    setOpenMobileId(null)
  }

  const currentLang = (i18n.language || 'en') as 'en' | 'bn'

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'bn' : 'en'
    i18n.changeLanguage(nextLang)
  }

  return (
    <nav className="w-full border-b border-border bg-card/95 backdrop-blur text-foreground fixed top-0 h-14 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-primary transition-colors shrink-0"
        >
          {mounted && currentLang === 'en' ? 'Sharif' : 'শরিফ'}
          <span className="text-accent transition-colors">
            {mounted && currentLang === 'en' ? 'Academy' : 'একাডেমি'}
          </span>
        </Link>

        {/* --- ডেস্কটপ/ল্যাপটপ মেনু (lg এবং তার বড়) --- */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {data?.map((item) => {
            const isActive = pathname === item.path

            return (
              <div key={item.id} className="relative group">
                <Link
                  href={item.path}
                  className={`px-2.5 xl:px-3 py-2 flex items-center gap-1 text-sm xl:text-base font-semibold transition-colors ${
                    isActive ? 'text-accent' : 'text-muted hover:text-accent'
                  }`}
                >
                  {mounted ? item.Name[currentLang] : item.Name['en']}

                  {item.hasDropdown && (
                    <IoIosArrowDown className="text-xs group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {item.hasDropdown && (
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="ml-4 w-2.5 h-2.5 bg-card border-t border-l border-border rotate-45 absolute -top-1 left-0 z-10"></div>
                    <div className="min-w-60 shadow-2xl rounded-xl border border-border py-2 bg-card">
                      {item?.subLink?.map((sub) => (
                        <div key={sub.id} className="relative group/nested">
                          <Link
                            href={sub.path}
                            className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent/10 hover:text-accent transition-all"
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
                              <div className="bg-card min-w-60 shadow-2xl rounded-xl border border-border py-2 max-h-95 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                                {sub?.nestedLink?.map((nested) => (
                                  <Link
                                    key={nested.id}
                                    href={nested.path}
                                    className="block px-5 py-2.5 text-sm font-medium text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors"
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

        {/* --- ডান পাশের কন্ট্রোল --- */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:space-x-3">
          <Darkened />

          <button
            onClick={toggleLanguage}
            className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold bg-primary text-primary-foreground border border-primary hover:opacity-90 rounded-lg transition-opacity uppercase tracking-wider cursor-pointer whitespace-nowrap"
          >
            {mounted ? (currentLang === 'en' ? 'English' : 'বাংলা') : 'English'}
          </button>

          {isPending ? (
            <div className="w-8 h-8 bg-border rounded-full animate-pulse" />
          ) : session ? (
            <div className="relative group hidden sm:block">
              {/* Profile Avatar */}
              <button className="flex items-center gap-2 cursor-pointer focus:outline-none">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? 'User avatar'}
                    width={36}
                    height={36}
                    className="rounded-full w-8 h-8 sm:w-9 sm:h-9 object-cover ring-2 ring-accent ring-offset-2 ring-offset-background"
                  />
                ) : (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center ring-2 ring-accent ring-offset-2 ring-offset-background">
                    <span className="text-primary-foreground text-sm font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 min-w-56">
                <div className="w-2.5 h-2.5 bg-card border-t border-l border-border rotate-45 absolute -top-1 right-3 z-10"></div>

                <div className="bg-card rounded-xl shadow-2xl border border-border overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
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
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground text-sm font-bold">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <CgProfile className="text-base" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <MdDashboard className="text-base" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <IoSettingsOutline className="text-base" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  <div className="border-t border-border py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 w-full transition-colors"
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
              className="hidden sm:inline-flex items-center justify-center gap-2 px-3 lg:px-4 py-1.5 bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground text-xs lg:text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap"
            >
              <span>Sign in</span>
              <LuLogIn className="text-base stroke-[2.5]" />
            </Link>
          )}

          {/* --- হ্যামবার্গার --- */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
          >
            {mobileOpen ? (
              <IoCloseOutline className="text-2xl" />
            ) : (
              <IoMenuOutline className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* --- মোবাইল/ট্যাবলেট স্লাইড-ডাউন মেনু --- */}
      <div
        className={`lg:hidden absolute top-14 left-0 w-full bg-card border-b border-border shadow-2xl overflow-y-auto transition-all duration-300 ease-in-out ${
          mobileOpen
            ? 'max-h-[calc(100vh-3.5rem)] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {data?.map((item) => {
            const isActive = pathname === item.path
            const isOpen = openMobileId === item.id

            return (
              <div
                key={item.id}
                className="border-b border-border/60 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.path}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-accent'
                        : 'text-foreground/80 hover:text-accent'
                    }`}
                  >
                    {mounted ? item.Name[currentLang] : item.Name['en']}
                  </Link>

                  {item.hasDropdown && (
                    <button
                      onClick={() => setOpenMobileId(isOpen ? null : item.id)}
                      aria-label="Submenu toggle"
                      className="p-3 text-muted hover:text-accent"
                    >
                      <IoIosArrowDown
                        className={`text-sm transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {item.hasDropdown && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-[1000px] pb-2' : 'max-h-0'
                    }`}
                  >
                    {item?.subLink?.map((sub) => (
                      <div key={sub.id} className="pl-3">
                        <Link
                          href={sub.path}
                          className="block py-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
                        >
                          {mounted
                            ? sub.Name[currentLang] || sub.Name['en']
                            : sub.Name['en']}
                        </Link>

                        {sub.hasNested &&
                          sub?.nestedLink?.map((nested) => (
                            <Link
                              key={nested.id}
                              href={nested.path}
                              className="block pl-4 py-1.5 text-xs text-muted hover:text-accent transition-colors"
                            >
                              {mounted
                                ? nested.Name[currentLang] || nested.Name['en']
                                : nested.Name['en']}
                            </Link>
                          ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* মোবাইলে সাইন-ইন/প্রোফাইল */}
          <div className="sm:hidden pt-3">
            {session ? (
              <div className="flex items-center gap-3 py-2">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? 'User avatar'}
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8 object-cover ring-2 ring-accent"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-2 ring-accent">
                    <span className="text-primary-foreground text-xs font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {session.user.name}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold text-danger px-2 py-1"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg"
              >
                <span>Sign in</span>
                <LuLogIn className="text-base" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
