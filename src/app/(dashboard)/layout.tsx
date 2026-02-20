import {Appsidebar} from '@/components/global/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'



const Layout = ({children}: {children:React.ReactNode}) => {
  return (
    <SidebarProvider>
        <Appsidebar/>
        <SidebarInset className='bg-accent/20'>
            {children}
        </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout