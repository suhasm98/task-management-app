import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { logout } from "../features/auth/authSlice"
import asdf from "../assets/avatar.svg"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch(logout())
    toast.success("Logged out successfully!")
    navigate("/")
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-[#1E1F25] text-white">
      <div className="flex items-center">
        <h5 className="ml-2 leading-none font-semibold">Task Management</h5>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-0 flex items-center mr-3">
          <Avatar className="bg-[#E7E7FF] w-10 h-10 rounded-full mr-2">
            <AvatarImage src={asdf} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ChevronDown className="w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

export default Navbar
