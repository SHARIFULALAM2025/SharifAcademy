import ReusableLayout from '@/Component/ReusableLayout/ReusableLayout'
import { BangladeshDay } from '@/Component/ReusableLayout/sidebar'


const AllDay = ({ children }: { children: React.ReactNode }) => {
  return <ReusableLayout items={BangladeshDay}>{children}</ReusableLayout>
}

export default AllDay
