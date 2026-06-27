'use client'

import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathTextProps {
  text: string
}

export default function MathText({ text }: MathTextProps) {
  // ✅ আগে \n দিয়ে লাইন ভাগ করো
  const lines = text.split('\n')

  return (
    <span>
      {lines.map((line, lineIndex) => {
        const parts = line.split(/(\$[^$]+\$)/g)
        return (
          <span key={lineIndex}>
            {parts.map((part, i) =>
              part.startsWith('$') && part.endsWith('$') ? (
                <InlineMath key={i} math={part.slice(1, -1)} />
              ) : (
                <span key={i}>{part}</span>
              )
            )}
            {/* ✅ শেষ লাইন ছাড়া <br> দাও */}
            {lineIndex < lines.length - 1 && <br />}
          </span>
        )
      })}
    </span>
  )
}
