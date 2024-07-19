'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CheckSquare, BarChart2, User, Menu, LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SignOutButton from '@/components/auth/sign-out-button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

const Sidebar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                closeSidebar();
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    const NavItem = ({ href, icon: Icon, label }: SidebarProps) => {
        const isActive = pathname === href;
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={href}>
                        <Button
                            variant='ghost'
                            size='icon'
                            aria-label={label}
                            className={`hover:bg-[#1e1e1e] my-2 md:w-[45px] h-[45px] flex items-center md:justify-center rounded-[9px] ${
                                isActive
                                    ? 'bg-[#1e1e1e] border-2 border-border'
                                    : ''
                            }`}
                        >
                            <Icon className='h-6 w-6' />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent
                    side='right'
                    align='center'
                    className='bg-background border border-border text-popover-foreground scale-110 ml-2'
                >
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        );
    };

    return (
        <TooltipProvider>
            <div className='fixed left-0 top-0 h-screen flex z-[90]'>
                <aside
                    ref={sidebarRef}
                    className={`${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } fixed left-0 top-0 h-screen w-64 bg-background text-foreground flex flex-col items-center justify-between py-4 transition-transform duration-300 md:translate-x-0 md:w-20 z-50`}
                >
                    <div className='flex flex-col items-center space-y-4'>
                        {/* Logo */}
                        <div className='text-xl'>Doit.</div>

                        {/* Navigation Icons */}
                        <div>
                            <NavItem
                                href='/dashboard'
                                icon={CheckSquare}
                                label='Tasks'
                            />
                            <NavItem
                                href='/overview'
                                icon={BarChart2}
                                label='Overview'
                            />
                        </div>
                    </div>

                    {/* User Avatar and Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='cursor-pointer'>
                                <AvatarImage
                                    src='https://avatars.githubusercontent.com/u/38879140?s=48&v=4'
                                    alt='@begyall'
                                />
                                <AvatarFallback>UB</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align='end'
                            side='right'
                            sideOffset={8}
                            className='w-56 bg-background border border-border text-popover-foreground z-[90]'
                        >
                            <DropdownMenuItem>
                                <div>
                                    <h2>Udhay</h2>
                                    <p className='text-muted-foreground text-[12px]'>
                                        test123@gmail.com
                                    </p>
                                </div>
                            </DropdownMenuItem>
                            <Separator className='my-1' />
                            <DropdownMenuItem>
                                <User className='mr-2 h-4 w-4' />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <SignOutButton />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </aside>
                <button
                    className='md:hidden fixed top-4 left-4 p-2 bg-background border border-border rounded-md'
                    onClick={toggleSidebar}
                >
                    <Menu className='h-6 w-6' />
                </button>
                {isSidebarOpen && (
                    <div
                        className='fixed inset-0 bg-black bg-opacity-50 z-40'
                        onClick={closeSidebar}
                    ></div>
                )}
            </div>
        </TooltipProvider>
    );
};

export default Sidebar;
