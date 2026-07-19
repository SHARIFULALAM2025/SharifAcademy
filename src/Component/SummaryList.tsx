import { SummaryListProps } from '@/Types/chapter1'
import { LiaHandPointRightSolid } from 'react-icons/lia'

export const Summary = ({ items, className = '' }: SummaryListProps) => {
  return (
    <ul className={`text-foreground space-y-1 sm:space-y-2 mt-2 ${className}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className="
              flex items-start gap-1
              text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-base 2xl:text-lg
              leading-tight sm:leading-snug md:leading-normal
            "
        >
          <LiaHandPointRightSolid
            className="
                text-primary flex-shrink-0 mt-0.5
                text-xs sm:text-sm md:text-base lg:text-lg
              "
          />
          {item}
        </li>
      ))}
    </ul>
  )
}
