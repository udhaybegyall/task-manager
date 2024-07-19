'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    CheckSquare,
    BarChart2,
    User,
    PanelLeftOpen,
    LucideIcon,
} from 'lucide-react';
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
                            } ${
                                isSidebarOpen ? 'w-full justify-start px-4' : ''
                            }`}
                        >
                            <Icon className='h-6 w-6' />
                            {isSidebarOpen && (
                                <span className='ml-2'>{label}</span>
                            )}
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
                    className={`
                        fixed left-0 top-0 h-screen bg-background text-foreground 
                        flex flex-col items-center justify-between py-4 px-2
                        transition-all duration-300 ease-in-out
                        md:translate-x-0 md:w-20 z-50
                        ${
                            isSidebarOpen
                                ? 'translate-x-0 w-64'
                                : '-translate-x-full w-64'
                        }
                    `}
                >
                    <div className='flex flex-col items-center space-y-4 w-full'>
                        {/* Logo */}
                        <div
                            className={`text-xl md:text-2xl ${
                                isSidebarOpen ? 'text-3xl self-start ml-4' : ''
                            }`}
                        >
                            {isSidebarOpen ? 'Doit.' : 'D.'}
                        </div>

                        {/* Navigation Icons */}
                        <div className={`${isSidebarOpen ? 'w-full' : ''}`}>
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
                            <div
                                className={`${
                                    isSidebarOpen
                                        ? 'flex items-center border-2 border-border p-2 px-6 rounded-[50px]'
                                        : ''
                                }`}
                            >
                                <Avatar className={isSidebarOpen ? 'mr-2' : ''}>
                                    <AvatarImage
                                        src='https://avatars.githubusercontent.com/u/38879140?s=48&v=4'
                                        alt='@begyall'
                                    />
                                    <AvatarFallback>UB</AvatarFallback>
                                </Avatar>
                                {isSidebarOpen && (
                                    <span className='text-sm text-muted-foreground'>
                                        Udhay
                                    </span>
                                )}
                            </div>
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
                    className='md:hidden fixed top-6 left-4 p-2 bg-background border border-border rounded-md'
                    onClick={toggleSidebar}
                >
                    <PanelLeftOpen className='h-6 w-6' />
                </button>
                {isSidebarOpen && (
                    <div
                        className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
                        onClick={closeSidebar}
                    ></div>
                )}
            </div>
        </TooltipProvider>
    );
};

export default Sidebar;
