import ReusableLayout from '@/Component/ReusableLayout/ReusableLayout'
import { Prefix } from '@/Component/ReusableLayout/sidebar'

const prefixLayout = ({ children }: { children: React.ReactNode }) => {
  return <ReusableLayout items={Prefix}>{children}</ReusableLayout>
}

export default prefixLayout
