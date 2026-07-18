import React from 'react'
import allData from '@/data/prefix.json'
import { PrefixData } from '@/Types/prefix'

const data = allData as PrefixData

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Background ambient glow — brand colors instead of generic indigo/emerald neon */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* --- HERO / HEADER SECTION --- */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted">
            {data.topic.title_bn}
          </h1>
          <p className="text-lg text-muted leading-relaxed pt-2">
            {data.topic.definition}
          </p>
          <div className="pt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-card border border-border text-sm text-accent shadow-xl">
              ✨ <strong className="text-foreground/90">মূল বৈশিষ্ট্য:</strong>{' '}
              {data.topic.characteristics}
            </span>
          </div>
        </header>

        {/* --- FUNCTIONS SECTION --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-xl font-semibold text-foreground tracking-wide uppercase">
              উপসর্গের কাজ ও প্রয়োজনীয়তা
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.functions_of_prefix.map((func, index) => (
              <div
                key={index}
                className="bg-card/40 backdrop-blur-md p-5 rounded-2xl border border-border flex flex-col justify-between hover:border-primary/40 hover:bg-card/60 transition-all duration-300 group shadow-lg"
              >
                <span className="text-xs font-mono font-bold text-primary bg-primary/10 w-6 h-6 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  0{index + 1}
                </span>
                <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                  {func}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- PREFIX TYPES SECTION --- */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-xl font-semibold text-foreground tracking-wide uppercase">
              উপসর্গের প্রকারভেদ
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent"></div>
          </div>

          <div className="space-y-12">
            {data.types_of_prefix.map((type, tIdx) => (
              <div
                key={tIdx}
                className="bg-card/30 backdrop-blur-xl rounded-3xl border border-border p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
              >
                {/* Header inside Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl font-semibold text-foreground flex items-center gap-3">
                      <span className="w-2 h-6 rounded bg-accent" />
                      {type.type_name}
                    </h3>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-card text-muted border border-border text-xs font-bold tracking-wider uppercase">
                    মোট সংখ্যা:{' '}
                    <span className="text-primary font-mono">
                      {type.total_count}
                    </span>
                  </span>
                </div>

                {/* Sub-list if exists (বাংলা ও তৎসম) */}
                {type.list && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-muted uppercase tracking-widest">
                      উপসর্গসমূহ:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {type.list.map((item, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-3 py-1 rounded-xl bg-background border border-border text-sm font-mono text-primary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grid Examples for Normal Types */}
                {type.examples && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {type.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="bg-background/60 p-4 rounded-2xl border border-border hover:border-primary/30 transition-colors space-y-3"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">
                            {ex.prefix}
                          </span>
                          <span className="text-muted italic">
                            {ex.meaning}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-muted line-through decoration-danger/50">
                            {ex.base_word}
                          </span>
                          <span className="text-muted">➡️</span>
                          <span className="text-success font-bold text-base">
                            {ex.new_word}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Special Case for Foreign Languages */}
                {type.languages && (
                  <div className="space-y-8 pt-2">
                    {type.languages.map((lang, lIdx) => (
                      <div key={lIdx} className="space-y-4">
                        <div className="text-sm font-bold text-primary flex items-center gap-2 bg-primary/5 border border-primary/10 px-3 py-1 rounded-xl w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {lang.language} ভাষা থেকে aggregate
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {lang.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="bg-background/40 p-4 rounded-2xl border border-border hover:border-primary/30 transition-colors space-y-3"
                            >
                              <div className="flex justify-between items-center text-xs">
                                <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-mono font-bold">
                                  {ex.prefix}
                                </span>
                                <span className="text-muted italic">
                                  {ex.meaning}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-muted">
                                  {ex.base_word}
                                </span>
                                <span className="text-muted">➡️</span>
                                <span className="text-primary font-bold text-base">
                                  {ex.new_word}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- VARIATIONS SECTION --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-xl font-semibold text-foreground tracking-wide uppercase">
              একই শব্দের ভিন্ন ভিন্ন রূপভেদ
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.root_word_variations.map((v, vIdx) => (
              <div
                key={vIdx}
                className="bg-card/30 backdrop-blur-md border border-border rounded-2xl p-6 hover:border-primary/30 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-muted uppercase tracking-widest">
                    মূল শব্দ:
                  </h4>
                  <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold shadow-md shadow-primary/10">
                    {v.root_word}
                  </span>
                </div>
                <div className="w-full h-px bg-border" />
                <div className="flex flex-wrap gap-2">
                  {v.variations.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="text-xs px-3 py-2 rounded-xl bg-background border border-border hover:border-primary/30 text-foreground/80 font-medium transition-colors"
                    >
                      ✨ {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
