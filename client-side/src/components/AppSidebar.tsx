import { BookOpenText, LayoutGrid } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import Logo from "@/assets/Logo"

const AppSidebar = () => {
  const location = useLocation()
  return (
    <div className="w-24 h-screen bg-[#1E1F25] flex flex-col items-center ">
      <div className="pt-5 h-24">
        <Logo />
      </div>
      <div>
        <Link
          to={"/dashboard"}
          title="Dashboard"
          className={cn(
            "w-12 h-12 my-4 rounded-2xl flex items-center justify-center",
            {
              ["bg-[#5051F9]"]: location.pathname.includes("dashboard"),
            }
          )}
        >
          <LayoutGrid color="white" />
        </Link>
        <Link
          to={"/tasks"}
          title="Tasks"
          className={cn(
            "w-12 h-12 my-4 rounded-2xl flex items-center justify-center",
            {
              ["bg-[#5051F9]"]: location.pathname.includes("tasks"),
            }
          )}
        >
          <BookOpenText color="white" />
        </Link>
      </div>
    </div>
  )
}

export default AppSidebar
