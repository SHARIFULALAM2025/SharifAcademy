// sidebar.ts — type export করুন
import { FaBookOpen, FaPenSquare } from 'react-icons/fa'

export interface SidebarItem {
  id: number
  label: string
  href: string
  icon: React.ReactNode
}

export const sidebarItems: SidebarItem[] = [
  { id: 1, label: 'MCQ', href: '/bangle/mcq', icon: <FaBookOpen /> },
  { id: 2, label: 'Exam', href: '/bangle/exam', icon: <FaPenSquare /> },
]

export const banglaLiteratureHistory: SidebarItem[] = [
  {
    id: 1,
    label: 'MCQ',
    href: '/banglaLiteratureHistory/mcq',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'Exam',
    href: '/banglaLiteratureHistory/exam',
    icon: <FaPenSquare />,
  },
]
export const ancientPeriodBanglaLiterature: SidebarItem[] = [
  {
    id: 1,
    label: 'MCQ',
    href: '/banglaLiteratureHistory/mcq',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'Exam',
    href: '/banglaLiteratureHistory/exam',
    icon: <FaPenSquare />,
  },
]
export const medievalPeriodBanglaLiterature: SidebarItem[] = [
  {
    id: 1,
    label: 'MCQ',
    href: '/banglaLiteratureHistory/mcq',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'Exam',
    href: '/banglaLiteratureHistory/exam',
    icon: <FaPenSquare />,
  },
]

export const CountryCurrencyCapital: SidebarItem[] = [
  {
    id: 1,
    label: 'Lcm and Hcm ',
    href: '/math/lcmHcm',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'exam',
    href: '/math/exam',
    icon: <FaPenSquare />,
  },
]
export const BangladeshDay: SidebarItem[] = [
  {
    id: 1,
    label: 'দিবস',
    href: '/day/allMcqDay',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'পরীক্ষা দিন',
    href: '/day/exam',
    icon: <FaPenSquare />,
  },
  {
    id: 3,
    label: 'বাংক পরীক্ষার প্রশ্ন',
    href: '/day/bankAllMcq',
    icon: <FaPenSquare />,
  },
  {
    id: 4,
    label: 'বিসিএস পরীক্ষার প্রশ্ন',
    href: '/day/bcs',
    icon: <FaPenSquare />,
  },
  {
    id: 5,
    label: 'অনন্য পরীক্ষার প্রশ্ন',
    href: '/day/differentExam',
    icon: <FaPenSquare />,
  },
  {
    id: 6,
    label: 'বিশ্ববিদ্যালয় পরীক্ষার প্রশ্ন',
    href: '/day/university',
    icon: <FaPenSquare />,
  },
  {
    id: 7,
    label: 'প্রাকটিস করুন',
    href: '/day/practice',
    icon: <FaPenSquare />,
  },
]
export const Treaty: SidebarItem[] = [
  {
    id: 1,
    label: 'practice',
    href: '/treaty/practice',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'exam',
    href: '/treaty/exam',
    icon: <FaPenSquare />,
  },
]
export const Saying: SidebarItem[] = [
  {
    id: 1,
    label: 'practice',
    href: '/treaty/practice',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'exam',
    href: '/treaty/exam',
    icon: <FaPenSquare />,
  },
]
export const Punctuation: SidebarItem[] = [
  {
    id: 1,
    label: 'practice',
    href: '/treaty/practice',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'exam',
    href: '/treaty/exam',
    icon: <FaPenSquare />,
  },
]
export const Narration: SidebarItem[] = [
  {
    id: 1,
    label: 'practice',
    href: '/treaty/practice',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'exam',
    href: '/treaty/exam',
    icon: <FaPenSquare />,
  },
]
export const Prefix: SidebarItem[] = [
  {
    id: 1,
    label: 'practice',
    href: '/treaty/practice',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'exam',
    href: '/treaty/exam',
    icon: <FaPenSquare />,
  },
]
export const Idioms: SidebarItem[] = [
  {
    id: 1,
    label: 'practice',
    href: '/treaty/practice',
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    label: 'exam',
    href: '/treaty/exam',
    icon: <FaPenSquare />,
  },
]

