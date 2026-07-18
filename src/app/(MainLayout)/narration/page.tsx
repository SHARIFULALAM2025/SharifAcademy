import React from 'react'
import allData from '@/data/narration.json'
import { NarrationData } from '@/Types/narration'

const data = allData as NarrationData

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 font-body">
      {/* Background Ornaments — echoes theme's ink + gilt identity */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="space-y-12 relative z-10">
        {/* --- HERO / HEADER SECTION --- */}
        <header className="text-center space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted">
            {data.topic.bangla}
          </h1>
        </header>

        {/* --- GENERAL DEFINITION --- */}
        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-card rounded-2xl p-8 border border-border text-center">
            <p className="text-2xl sm:text-3xl font-medium text-primary italic leading-relaxed">
              {data.definition.general}
            </p>
          </div>
        </section>

        {/* --- TYPES SECTION --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.definition.types.map((type, index) => (
            <div
              key={index}
              className="bg-card/70 backdrop-blur-xl rounded-3xl border border-border shadow-2xl flex flex-col hover:border-accent/40 transition-all group"
            >
              <div className="p-8 space-y-5">
                <div className="flex justify-between items-center">
                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {type.name}
                  </h3>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-background text-muted border border-border uppercase tracking-widest">
                    {type.english}
                  </span>
                </div>
                <p className="text-muted leading-relaxed text-sm">
                  {type.definition}
                </p>
                {type.identifying_mark && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/5 border border-accent/20 text-accent text-xs">
                    <span className="text-lg">💡</span>
                    <span>{type.identifying_mark}</span>
                  </div>
                )}
              </div>

              <div className="mt-auto p-8 pt-0">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />
                <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">
                  উদাহরণসমূহ
                </h4>
                <ul className="space-y-3">
                  {type.examples.map((ex, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-foreground bg-background/50 p-4 rounded-xl border border-border hover:border-accent/30 transition-colors font-mono relative overflow-hidden group/item"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 bg-accent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      <span className="text-accent mr-2">❯</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* --- CONVERSION RULES --- */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              উক্তি পরিবর্তনের নিয়মাবলী
            </h2>
            <div className="h-px flex-grow bg-border"></div>
          </div>

          <div className="grid gap-6">
            {data.conversion_rules.map((rule) => (
              <div
                key={rule.rule_no}
                className="bg-card rounded-3xl border border-border overflow-hidden group hover:bg-card/80 transition-all"
              >
                {/* Rule Header */}
                <div className="p-6 flex items-start gap-6 border-b border-border">
                  <div className="flex-none w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                    {rule.rule_no}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {rule.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed max-w-3xl">
                      {rule.explanation}
                    </p>
                  </div>
                </div>

                {/* Rule Examples */}
                <div className="p-6 bg-background/30">
                  {rule.example && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
                          প্রত্যক্ষ উক্তি
                        </span>
                        <p className="text-foreground font-medium">
                          {rule.example.direct}
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-accent/5 border border-accent/10 space-y-2">
                        <span className="text-[10px] font-black text-accent uppercase tracking-tighter">
                          পরোক্ষ উক্তি
                        </span>
                        <p className="text-foreground font-medium">
                          {rule.example.indirect}
                        </p>
                      </div>
                    </div>
                  )}

                  {rule.word_change_table && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {rule.word_change_table.map((row, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-card border border-border flex flex-col items-center justify-center text-center gap-1 hover:border-accent/40 transition-colors"
                        >
                          <span className="text-[10px] text-muted font-bold">
                            {row.pratyakkho}
                          </span>
                          <span className="text-accent font-bold">
                            ➡️ {row.porokkho}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {rule.subtypes && (
                    <div className="space-y-8">
                      {rule.subtypes.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-4">
                          <div className="flex items-center gap-2 px-3 py-1 rounded bg-background w-fit text-[11px] font-bold text-accent">
                            {sub.category}
                          </div>
                          <div className="grid gap-3">
                            {sub.examples.map((ex, eIdx) => (
                              <div
                                key={eIdx}
                                className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-card border border-border"
                              >
                                <div className="text-sm text-foreground">
                                  <span className="text-primary/50 mr-2">
                                    ●
                                  </span>
                                  {ex.direct}
                                </div>
                                {ex.indirect && (
                                  <div className="text-sm text-accent font-medium">
                                    <span className="text-accent mr-2">●</span>
                                    {ex.indirect}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SUMMARY FOOTER --- */}
        <footer className="relative overflow-hidden bg-primary rounded-[2.5rem] p-8 sm:p-12 text-primary-foreground shadow-2xl shadow-primary/20">
          <div className="relative z-10 space-y-8">
            <h2 className="font-display text-2xl font-bold flex items-center gap-3">
              <span className="p-2 bg-primary-foreground/20 rounded-lg">
                📌
              </span>
              এক নজরে মূল পয়েন্টসমূহ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.summary_points.map((point, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/10"
                >
                  <span className="flex-none w-6 h-6 rounded-full bg-primary-foreground text-primary flex items-center justify-center font-bold text-xs shadow-md">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Page
