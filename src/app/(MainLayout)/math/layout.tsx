import ReusableLayout from '@/Component/ReusableLayout/ReusableLayout'
import { CountryCurrencyCapital } from '@/Component/ReusableLayout/sidebar'

const LcmHcm = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReusableLayout items={CountryCurrencyCapital}>{children}</ReusableLayout>
  )
}

export default LcmHcm
