// ১. উপসর্গের সাধারণ গঠন এবং তথ্যের ইন্টারফেস
interface TopicInfo {
  title_bn: string
  title_en: string
  definition: string
  characteristics: string
}

// ২. উপসর্গের উদাহরণের সাধারণ ফরম্যাট
interface PrefixExample {
  prefix: string
  meaning: string
  base_word: string
  new_word: string
}

// ৩. বিদেশী উপসর্গের ক্ষেত্রে ভাষার ভিত্তিক গ্রুপ
interface ForeignLanguageGroup {
  language: string
  examples: PrefixExample[]
}

// ৪. প্রতিটি প্রধান উপসর্গ টাইপের (যেমন: বাংলা, তৎসম) ইন্টারফেস
interface PrefixType {
  type_name: string
  total_count: number | string // খাঁটি বাংলা/তৎসম সংখ্যার জন্য নাম্বার, বিদেশীর জন্য "বহু" স্ট্রিং
  list?: string[] // বাংলা ও তৎসমের জন্য ঐচ্ছিক লিস্ট array
  languages?: ForeignLanguageGroup[] // শুধুমাত্র বিদেশী উপসর্গের জন্য ঐচ্ছিক ল্যাঙ্গুয়েজ array
  examples?: PrefixExample[] // বাংলা ও তৎসমের সরাসরি উদাহরণের জন্য
}

// ৫. মূল শব্দের ভিন্ন ভিন্ন উপসর্গের পরিবর্তনের ইন্টারফেস
interface RootWordVariation {
  root_word: string
  variations: string[]
}

// ৬. মূল এক্সপোর্টযোগ্য ইন্টারফেস (যা আপনি ব্যবহার করবেন)
export interface PrefixData {
  topic: TopicInfo
  functions_of_prefix: string[]
  types_of_prefix: PrefixType[]
  root_word_variations: RootWordVariation[]
}
