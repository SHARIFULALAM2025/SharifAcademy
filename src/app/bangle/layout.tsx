import ReusableLayout from "@/Component/ReusableLayout/ReusableLayout"
import { sidebarItems } from "@/Component/ReusableLayout/sidebar"


const LanguageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReusableLayout items={sidebarItems}>
      {children}
    </ReusableLayout>
  )
}

export default LanguageLayout
