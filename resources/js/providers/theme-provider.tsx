import {
    createContext,
    useEffect,
    useMemo,
} from 'react';

import {
    useAppearance,
    type Appearance,
} from '@/hooks/use-appearance';

import {
    useThemeColor,
    type ThemeColor,
} from '@/hooks/use-theme-color';

export type Theme = {
    mode: Appearance;
    color: ThemeColor;
};

type ThemeProviderState = {
    theme: Theme;

    resolvedMode:
        | 'light'
        | 'dark';

    setTheme: (
        theme: Theme
    ) => void;

    setMode: (
        mode: Appearance
    ) => void;

    setColor: (
        color: ThemeColor
    ) => void;
};

export const ThemeProviderContext =
    createContext<ThemeProviderState | null>(
        null
    );

export function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        appearance,
        resolvedAppearance,
        updateAppearance,
    } = useAppearance();

    const {
        color,
        updateColor,
    } = useThemeColor();

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            `${color}-${resolvedAppearance}`
        );
    }, [
        color,
        resolvedAppearance,
    ]);

    const setTheme = (
        theme: Theme
    ) => {
        updateAppearance(
            theme.mode
        );

        updateColor(
            theme.color
        );
    };

    const value: ThemeProviderState =
        useMemo(
            () => ({
                theme: {
                    mode: appearance,
                    color,
                },

                resolvedMode:
                    resolvedAppearance,

                setTheme,

                setMode:
                    updateAppearance,

                setColor:
                    updateColor,
            }),
            [
                appearance,
                resolvedAppearance,
                color,
                updateAppearance,
                updateColor,
            ]
        );

    return (
        <ThemeProviderContext.Provider
            value={value}
        >
            {children}
        </ThemeProviderContext.Provider>
    );
}
