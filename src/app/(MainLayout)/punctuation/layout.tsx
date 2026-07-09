import ReusableLayout from '@/Component/ReusableLayout/ReusableLayout'
import { Punctuation } from '@/Component/ReusableLayout/sidebar'

const punctuationLayout = ({ children }: { children: React.ReactNode }) => {
  return <ReusableLayout items={Punctuation}>{children}</ReusableLayout>
}

export default punctuationLayout
