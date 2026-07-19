'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="min-h-[70vh] bg-background text-foreground flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12 overflow-hidden relative transition-colors duration-300">
            {/* Background Decorative Blobs */}
            <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center">
                {/* Error Image Section */}
                <div className="mb-6 transform hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <Image
                        width={400}
                        height={300}
                        priority
                        src="https://i.ibb.co.com/N65s5jrz/Cjdlfsfjapture-removebg-preview.png"
                        alt="404 Error Illustration"
                        className="h-40 sm:h-56 md:h-64 lg:h-72 mx-auto object-contain drop-shadow-[0_15px_30px_color-mix(in_oklab,var(--primary)_25%,transparent)]"
                    />
                </div>

                {/* Brand Subtitle Divider */}
                <div className="flex items-center gap-3 mb-6 justify-center w-full">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
                    <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase shrink-0">
                        Page Not Found
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
                </div>

                {/* Headings */}
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-snug">
                    Oops! You&apos;re{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Lost in Space
                    </span>
                </h2>

                {/* Description */}
                <p className="text-muted text-sm md:text-base max-w-sm mx-auto mb-8 sm:mb-10 leading-relaxed">
                    The page you are looking for might have been removed, had its name
                    changed, or is temporarily unavailable. Let&apos;s get you back on
                    track!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full sm:w-auto px-8 h-12 inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-md shadow-primary/20 cursor-pointer text-sm"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 h-12 inline-flex items-center justify-center bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-muted/10 transition-all active:scale-95 cursor-pointer text-sm"
                    >
                        Go Backward
                    </button>
                </div>
            </div>
        </div>
    )
}