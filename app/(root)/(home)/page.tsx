import { useTheme } from "@/context/ThemeProvider"
import { UserButton } from "@clerk/nextjs"

const Home = () => {
  return (
    <div>
        <UserButton/>
    </div>
  )
}
export default Home