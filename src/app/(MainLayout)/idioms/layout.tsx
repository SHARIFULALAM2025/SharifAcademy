import ReusableLayout from '@/Component/ReusableLayout/ReusableLayout'
import { Idioms } from '@/Component/ReusableLayout/sidebar'

const idiomsLayout = ({ children }: { children: React.ReactNode }) => {
  return <ReusableLayout items={Idioms}>{children}</ReusableLayout>
}

export default idiomsLayout
