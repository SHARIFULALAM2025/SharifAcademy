'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18nInstance from '../../../i18n'

interface I18nProviderProps {
  children: ReactNode
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <div className="invisible">{children}</div>
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
