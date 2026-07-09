import ReusableLayout from '@/Component/ReusableLayout/ReusableLayout'
import {  Saying } from '@/Component/ReusableLayout/sidebar'

const sayingLayout = ({ children }: { children: React.ReactNode }) => {
  return <ReusableLayout items={Saying}>{children}</ReusableLayout>
}

export default sayingLayout
