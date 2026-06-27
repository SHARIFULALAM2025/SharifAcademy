import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../Provider/ThemeProvider';

const Darkened = () => {
     const { theme, setTheme } = useTheme()
     const [mounted, setMounted] = useState(false)


     useEffect(() => {
       const timer = setTimeout(() => {
         setMounted(true)
       }, 0)

       return () => clearTimeout(timer)
     }, [])

     if (!mounted) {
       return (
         <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-lg" />
       )
     }
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:ring-2 hover:ring-green-400 transition-all duration-200 cursor-pointer flex items-center justify-center"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <FiSun className=" text-amber-400" />
        ) : (
          <FiMoon className=" text-slate-600 dark:text-slate-400" />
        )}
      </button>
    )
};

export default Darkened;