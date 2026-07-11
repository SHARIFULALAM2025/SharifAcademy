import ReusableLayout from '@/Component/ReusableLayout/ReusableLayout'
import { Narration } from '@/Component/ReusableLayout/sidebar'

const narrationLayout = ({ children }: { children: React.ReactNode }) => {
  return <ReusableLayout items={Narration}>{children}</ReusableLayout>
}

export default narrationLayout
