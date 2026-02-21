'use client'

import { CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from 'lucide-react'
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useHasActiveSubscription } from '@/features/subscriptions/hooks/use-subscription';

const menuItems = [
    {
        title: 'Workflows',
        items: [{
            title: 'workflows',
            icon: FolderOpenIcon,
            url: '/workflows',
        },{
            title: 'Credentials',
            icon: KeyIcon,
            url:'/credentials'
        },{
            title:'Executions',
            icon:HistoryIcon,
            url:'/executions'
        }],
    }
];

export const Appsidebar = () => {

    const router = useRouter()
    const pathname = usePathname()
    const {hasActiveSubscription, isLoading} = useHasActiveSubscription()

    return (
        <Sidebar 
            collapsible='icon'
            className="border-r bg-background shadow-sm"
        >
            <SidebarHeader className="border-b">
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        asChild 
                        className='gap-x-4 h-12 px-4 hover:bg-muted/60 transition-all duration-200 rounded-md'
                    >
                        <Link href='/' prefetch>
                           <Image src='/logo.svg' alt='logo' width={24} height={24}/>
                           <span className='text-sm font-semibold tracking-tight'>Vivid</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>

            <SidebarContent className="py-3">
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-1">
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={item.url === '/' ? pathname === '/' : pathname.startsWith(item.url)}
                                            asChild
                                            className="
                                                group
                                                gap-x-4 h-11 px-4 rounded-md
                                                transition-all duration-200
                                                hover:bg-muted/70 
                                                hover:text-primary
                                                data-[active=true]:bg-primary/10
                                                data-[active=true]:text-primary
                                                data-[active=true]:font-medium
                                            "
                                        >
                                            <Link href={item.url} prefetch> 
                                                <item.icon className='size-4 transition-transform duration-200 group-hover:scale-110'/>
                                                <span className="text-sm capitalize">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t pt-3 space-y-1">

                {/* PREMIUM UPGRADE BUTTON */}

              {!hasActiveSubscription && !isLoading &&(
                 <SidebarMenuItem>
                    <SidebarMenuButton 
                        tooltip='Upgrade to pro' 
                        onClick={()=>authClient.checkout({
                            slug:'pro'
                        })}
                        className="
                            group relative overflow-hidden
                            gap-x-4 h-11 px-4 rounded-lg
                            font-medium tracking-tight
                            bg-primary text-primary-foreground
                            shadow-sm
                            transition-all duration-300 ease-out
                            hover:shadow-md
                            hover:-translate-y-[1px]
                            active:translate-y-0
                            dark:shadow-[0_0_24px_-6px_oklch(0.82_0.06_80/0.35)]
                        "
                    >
                        <StarIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                        <span className="text-sm">Upgrade to Pro</span>

                        {/* Subtle shine sweep */}
                        <span
                            className="
                                pointer-events-none absolute inset-0
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-500
                                bg-gradient-to-r from-transparent via-white/20 to-transparent
                                -translate-x-full group-hover:translate-x-full
                                duration-700 ease-out
                            "
                        />
                    </SidebarMenuButton>
                </SidebarMenuItem>

              )}
                
                {/* Billing */}
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        tooltip='Billing portal' 
                        onClick={()=>authClient.customer.portal()}
                        className='gap-x-4 h-11 px-4 rounded-md transition-all duration-200 hover:bg-muted/70 hover:text-primary'
                    >
                        <CreditCardIcon className='h-4 w-4'/>
                        <span className="text-sm">Billing Portal</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Logout */}
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        tooltip='Logout' 
                        onClick={()=>authClient.signOut({fetchOptions:{onSuccess:()=>router.push('/login')}})}
                        className='gap-x-4 h-11 px-4 rounded-md transition-all duration-200 hover:bg-destructive/10 hover:text-destructive'
                    >
                        <LogOutIcon className='h-4 w-4'/>
                        <span className="text-sm">Logout</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>

            </SidebarFooter>
        </Sidebar>
    )
}