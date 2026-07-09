import ReusableLayout from '@/Component/ReusableLayout/ReusableLayout'
import {  Treaty } from '@/Component/ReusableLayout/sidebar'

const treaty = ({ children }: { children: React.ReactNode }) => {
  return <ReusableLayout items={Treaty}>{children}</ReusableLayout>
}

export default treaty
