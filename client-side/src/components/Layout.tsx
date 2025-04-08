import React from "react"
import Navbar from "./Navbar"
import AppSidebar from "./AppSidebar"

const Layout = ({ children }: React.ComponentProps<"div">) => {
  return (
    <div className="overflow-hidden bg-[#131517] flex">
      <AppSidebar />
      <div className="w-full">
        <Navbar />
        <div className="mx-16">{children}</div>
      </div>
    </div>
  )
}

export default Layout
