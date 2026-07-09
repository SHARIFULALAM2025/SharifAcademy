import React from 'react';
import allData from '@/data/treaty.json';
import { TreatyDataset } from '@/Types/treaty';

const data = allData as TreatyDataset;

const Page = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-teal-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header Section */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8">
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            {data.topic}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/60 shadow-inner">
            {data.definition}
          </p>
        </header>

        {/* Purpose & Important Notes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Purpose Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              সন্ধির উদ্দেশ্য ({data.purpose.length})
            </h2>
            <ul className="space-y-2.5 text-slate-300">
              {data.purpose.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="text-teal-500 font-mono mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notes Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              গুরুত্বপূর্ণ নোট ({data.important_notes.length})
            </h2>
            <ul className="space-y-2.5 text-slate-300">
              {data.important_notes.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
                  <span className="text-amber-500 font-bold">!</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sandhi Variations & Examples Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white border-l-4 border-teal-500 pl-3">
            সন্ধির প্রকারভেদ ও উদাহরণসমূহ
          </h2>

          <div className="space-y-6">
            {/* General Examples */}
            <SectionWrapper title="সাধারণ সন্ধির উদাহরণ" count={data.example.length} badgeColor="bg-blue-500/10 text-blue-400 border-blue-900">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.example.map((item, index) => (
                  <EquationCard key={index} text={item} />
                ))}
              </div>
            </SectionWrapper>

            {/* Bisorgo Sandhi */}
            <SectionWrapper title="বিসর্গ সন্ধি" count={data.bisorgo_sandhi.length} badgeColor="bg-purple-500/10 text-purple-400 border-purple-900">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.bisorgo_sandhi.map((item, index) => (
                  <EquationCard key={index} text={item} highlight />
                ))}
              </div>
            </SectionWrapper>

            {/* Nipatone Siddha Sandhi */}
            <SectionWrapper title="নিপাতনে সিদ্ধ সন্ধি" count={data.nipatone_sandhi.length} badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-900">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.nipatone_sandhi.map((item, index) => (
                  <EquationCard key={index} text={item} variant="emerald" />
                ))}
              </div>
            </SectionWrapper>
          </div>
        </div>

      </div>
    </div>
  );
};

/* --- Mini Helper Components to Keep Code Clean --- */

interface SectionWrapperProps {
  title: string;
  count: number;
  badgeColor: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ title, count, badgeColor, children }: SectionWrapperProps) => (
  <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 space-y-4">
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
      <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
        {count}টি উদাহরণ
      </span>
    </div>
    {children}
  </div>
);

interface EquationCardProps {
  text: string;
  highlight?: boolean;
  variant?: 'default' | 'emerald';
}

const EquationCard = ({ text, highlight = false, variant = 'default' }: EquationCardProps) => {
  // Split the equation string cleanly to style components separately if needed
  const parts = text.split('=');
  const formula = parts[0]?.trim();
  const result = parts[1]?.trim();

  return (
    <div className={`p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
      highlight
        ? 'bg-purple-950/20 border-purple-900/60 hover:border-purple-700/80'
        : variant === 'emerald'
        ? 'bg-emerald-950/20 border-emerald-900/60 hover:border-emerald-700/80'
        : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
    }`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-400 tracking-wide">{formula}</span>
        <span className="text-xs text-slate-600 font-bold">→</span>
        <span className={`font-bold tracking-wide text-base ${
          highlight ? 'text-purple-400' : variant === 'emerald' ? 'text-emerald-400' : 'text-teal-400'
        }`}>
          {result || text}
        </span>
      </div>
    </div>
  );
};

export default Page;