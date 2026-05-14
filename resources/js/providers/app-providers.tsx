import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/providers/theme-provider';
import React from 'react';
import { useAppearance } from '@/hooks/use-appearance';

const ProvidersContent = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { resolvedAppearance } = useAppearance();

    return (
        <TooltipProvider delayDuration={0}>
            {children}

            <Toaster
                richColors
                visibleToasts={4}
                theme={resolvedAppearance}
            />
        </TooltipProvider>
    );
};

const AppProviders = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ThemeProvider>
            <ProvidersContent>
                {children}
            </ProvidersContent>
        </ThemeProvider>
    );
};

export default AppProviders;
