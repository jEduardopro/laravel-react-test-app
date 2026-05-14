import { useSyncExternalStore } from 'react';

export type ThemeColor =
    | 'blue'
    | 'amber'
    | 'cyan'
    | 'emerald'
    | 'fuchsia'
    | 'indigo'
    | 'orange'
    | 'lime'
    | 'pink'
    | 'green';

type UseThemeColorReturn = {
    readonly color: ThemeColor;

    readonly updateColor: (
        color: ThemeColor
    ) => void;
};

const STORAGE_KEY =
    'theme_color';

const listeners =
    new Set<() => void>();

let currentColor: ThemeColor =
    'blue';

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const subscribe = (
    callback: () => void
) => {
    listeners.add(callback);

    return () =>
        listeners.delete(callback);
};

const notify = (): void => {
    listeners.forEach(
        (listener) =>
            listener()
    );
};

const getStoredColor =
    (): ThemeColor => {
        if (
            typeof window ===
            'undefined'
        ) {
            return 'blue';
        }

        return (
            (localStorage.getItem(
                STORAGE_KEY
            ) as ThemeColor) ||
            'blue'
        );
    };

export function initializeThemeColor(): void {
    if (
        typeof window ===
        'undefined'
    ) {
        return;
    }

    if (
        !localStorage.getItem(
            STORAGE_KEY
        )
    ) {
        localStorage.setItem(
            STORAGE_KEY,
            'blue'
        );

        setCookie(
            STORAGE_KEY,
            'blue'
        );
    }

    currentColor =
        getStoredColor();
}

export function useThemeColor():
    UseThemeColorReturn {
    const color: ThemeColor =
        useSyncExternalStore(
            subscribe,
            () => currentColor,
            () => 'blue'
        );

    const updateColor = (
        color: ThemeColor
    ): void => {
        currentColor = color;

        localStorage.setItem(
            STORAGE_KEY,
            color
        );

        setCookie(
            STORAGE_KEY,
            color
        );

        notify();
    };

    return {
        color,
        updateColor,
    } as const;
}
