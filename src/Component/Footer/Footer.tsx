import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
 
  ArrowUpRight
} from 'lucide-react'
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#0B131F] text-gray-400 font-sans border-t border-gray-800/80 pt-16 pb-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800/50">

          {/* Column 1: Logo, Vision & Socials (Span 4) */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#064E3B] to-[#047857] p-2.5 rounded-xl text-emerald-400 shadow-lg shadow-emerald-900/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                শরীফ <span className="text-emerald-400">একাডেমি</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400/90 max-w-sm">
              বাংলাদেশের মানুষের জন্য বাংলায় মানসম্পন্ন শিক্ষা — এটাই আমাদের লক্ষ্য। আমাদের দক্ষ মেন্টরদের সাথে আজই আপনার লার্নিং জার্নি শুরু করুন।
            </p>

            {/* Social Icons Container */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-[#141E30] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500 hover:bg-[#064E3B]/20 transition-all duration-300 group shadow-sm">
                <FaFacebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#141E30] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500 hover:bg-[#064E3B]/20 transition-all duration-300 group shadow-sm">
                <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#141E30] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500 hover:bg-[#064E3B]/20 transition-all duration-300 group shadow-sm">
                <FaYoutube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#141E30] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500 hover:bg-[#064E3B]/20 transition-all duration-300 group shadow-sm">
                <FaTwitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Courses Links (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold text-base uppercase tracking-wider mb-5 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-[2px] after:bg-emerald-500 after:bottom-[-6px] after:left-0">
              কোর্সমূহ
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-400 flex items-center gap-1 group transition-colors duration-200">
                  <span>প্রোগ্রামিং</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 flex items-center gap-1 group transition-colors duration-200">
                  <span>গ্রাফিক ডিজাইন</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 flex items-center gap-1 group transition-colors duration-200">
                  <span>ডিজিটাল মার্কেটিং</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 flex items-center gap-1 group transition-colors duration-200">
                  <span>ফ্রিল্যান্সিং</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold text-base uppercase tracking-wider mb-5 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-[2px] after:bg-emerald-500 after:bottom-[-6px] after:left-0">
              কোম্পানি
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">শিক্ষক হও</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">ক্যারিয়ার</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">ব্লগ</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Span 4) */}
          <div className="md:col-span-4">
            <h3 className="text-white font-semibold text-base uppercase tracking-wider mb-5 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-[2px] after:bg-emerald-500 after:bottom-[-6px] after:left-0">
              যোগাযোগ
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 bg-[#141E30]/50 border border-gray-800/40 p-3 rounded-xl hover:border-emerald-500/30 transition-all group">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-500 block">ইমেইল করুন</span>
                  <a href="mailto:hello@sharif-academy.com" className="text-white hover:text-emerald-400 transition-colors font-medium break-all">
                    hello@sharif-academy.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 bg-[#141E30]/50 border border-gray-800/40 p-3 rounded-xl hover:border-emerald-500/30 transition-all group">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-500 block">হটলাইন নম্বর</span>
                  <a href="tel:+88017XXXXXXXX" className="text-white hover:text-emerald-400 transition-colors font-medium">
                    +৮৮ ০১৭XX-XXXXXX
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 px-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-gray-300 font-medium">ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} শরীফ একাডেমি. অল রাইটস রিজার্ভড।
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">প্রাইভেসি পলিসি</a>
            <a href="#" className="hover:text-gray-300 transition-colors">টার্মস অ্যান্ড কন্ডিশনস</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer