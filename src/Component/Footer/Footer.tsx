import React from 'react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-foreground text-background font-body pt-16 pb-8 w-full border-t border-background/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 pb-12 border-b border-background/10">
          {/* Column 1: Logo, Vision & Socials (Span 4) */}
          <div className="md:col-span-4 space-y-5">
            <div className="">
              <Link href="/" className="flex items-center gap-2">
                <figure className="w-8 h-8 md:w-10 md:h-10 relative">
                  <Image
                    src="/profile-pic.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </figure>
                <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-background">
                  Sharif Academy
                </h1>
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-background/70 max-w-sm">
              বাংলাদেশের মানুষের জন্য বাংলায় মানসম্পন্ন শিক্ষা — এটাই আমাদের
              লক্ষ্য। আমাদের দক্ষ মেন্টরদের সাথে আজই আপনার লার্নিং জার্নি শুরু
              করুন।
            </p>

            {/* Social Icons Container */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  Icon: FaFacebook,
                  href: 'https://www.facebook.com/profile.php?id=61577170528426',
                },
                {
                  Icon: FaLinkedin,
                  href: 'https://www.linkedin.com/in/sharifulalam-dev',
                },
                {
                  Icon: FaYoutube,
                  href: 'https://www.youtube.com/@THEBANGLADESHTIMES-x4k',
                },
                {
                  Icon: FaTwitter,
                  href: 'https://www.youtube.com/@THEBANGLADESHTIMES-x4k',
                },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-background/70 hover:text-background transition-all duration-300 group shadow-sm
                    bg-[color-mix(in_oklab,var(--background)_8%,transparent)]
                    border border-[color-mix(in_oklab,var(--background)_15%,transparent)]
                    hover:border-[var(--accent)]
                    hover:bg-[color-mix(in_oklab,var(--accent)_18%,transparent)]"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Courses Links (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="font-display text-background font-semibold text-base uppercase tracking-wider mb-5 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-[2px] after:bg-accent after:bottom-[-6px] after:left-0">
              কোর্সমূহ
            </h3>
            <ul className="space-y-3 text-sm text-background/70">
              {[
                'প্রোগ্রামিং',
                'গ্রাফিক ডিজাইন',
                'ডিজিটাল মার্কেটিং',
                'ফ্রিল্যান্সিং',
              ].map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="hover:text-accent flex items-center gap-1 group transition-colors duration-200"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="font-display text-background font-semibold text-base uppercase tracking-wider mb-5 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-[2px] after:bg-accent after:bottom-[-6px] after:left-0">
              কোম্পানি
            </h3>
            <ul className="space-y-3 text-sm text-background/70">
              {['আমাদের সম্পর্কে', 'শিক্ষক হও', 'ক্যারিয়ার', 'ব্লগ'].map(
                (label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="hover:text-accent transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 4: Contact Info (Span 4) */}
          <div className="md:col-span-4">
            <h3 className="font-display text-background font-semibold text-base uppercase tracking-wider mb-5 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-[2px] after:bg-accent after:bottom-[-6px] after:left-0">
              যোগাযোগ
            </h3>
            <ul className="space-y-4 text-sm">
              <li
                className="flex items-start gap-3 p-3 rounded-xl transition-all"
                style={{
                  background:
                    'color-mix(in oklab, var(--background) 6%, transparent)',
                  border:
                    '1px solid color-mix(in oklab, var(--background) 10%, transparent)',
                }}
              >
                <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs text-background/50 block">
                    ইমেইল করুন
                  </span>
                  <a
                    href="mailto:hello@sharif-academy.com"
                    className="text-background hover:text-accent transition-colors font-medium break-all"
                  >
                    sharifulalam2025@gmail.com
                  </a>
                </div>
              </li>
              <li
                className="flex items-start gap-3 p-3 rounded-xl transition-all"
                style={{
                  background:
                    'color-mix(in oklab, var(--background) 6%, transparent)',
                  border:
                    '1px solid color-mix(in oklab, var(--background) 10%, transparent)',
                }}
              >
                <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs text-background/50 block">
                    হটলাইন নম্বর
                  </span>
                  <a
                    href="tel:+8801829197321"
                    className="text-background hover:text-accent transition-colors font-medium"
                  >
                    +88 1829197321
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 px-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span className="text-background/80 font-medium">
                  ঢাকা, বাংলাদেশ
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/50">
          <div>
            © {new Date().getFullYear()} শরীফ একাডেমি. অল রাইটস রিজার্ভড।
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-background transition-colors">
              প্রাইভেসি পলিসি
            </a>
            <a href="#" className="hover:text-background transition-colors">
              টার্মস অ্যান্ড কন্ডিশনস
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
