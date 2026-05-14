import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from '@/components/ui/sidebar';
import services from '@/routes/services';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { CalendarPlus, HandPlatter, Plus, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/core';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
    }) {
    const {t} = useTranslation()
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 w-full">
                <div className='flex items-center flex-1'>
                    <SidebarTrigger className="-ml-1 cursor-pointer" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className='flex box-border pr-5'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='rounded-full size-8 cursor-pointer'>
                                <Plus />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-40'>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <CalendarPlus />
                                    {t('new_appointment')}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <UserPlus />
                                    {t('add_client')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.visit(services.create())}>
                                    <HandPlatter />
                                    {t('create_service')}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </header>
    );
}
