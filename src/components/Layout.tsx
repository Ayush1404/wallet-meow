import { ReactNode } from "react"
import Header from "./Header"

type LayoutProps ={
    children:ReactNode
}

const Layout = ({children}:LayoutProps) => {
  return (
    <>
        <Header />
        <main  className="px-4 lg:px-14">
            {children}
        </main>
    </>
    
  )
}

export default Layout