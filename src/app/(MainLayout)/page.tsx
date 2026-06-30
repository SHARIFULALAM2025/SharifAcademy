import Footer from '@/Component/Footer/Footer'
import BlogSection from '@/Component/Home/BlogSection/BlogSection'
import Course from '@/Component/Home/Course/Course'

import Hero from '@/Component/Home/Hero/Hero'
import HowItWorkSection from '@/Component/Home/HowItWorkSection/HowItWorkSection'
import InstructorSection from '@/Component/Home/InstructorSection/InstructorSection'
import Newsletter from '@/Component/Home/Newsletter/Newsletter'
import PricingSection from '@/Component/Home/PricingSection/PricingSection'
import SuccessStories from '@/Component/Home/SuccessStories/SuccessStories'

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Course />
      <HowItWorkSection />
      <InstructorSection />
      <SuccessStories />
      <PricingSection />
      <BlogSection/>
      <Newsletter />
      <Footer />
    </div>
  )
}
