import { Check } from 'lucide-react';

import { useTheme } from '@/hooks/use-theme';

const colors = [
    {
        name: 'Blue',
        value: 'blue',
        className: 'bg-blue-500',
    },
    {
        name: 'Amber',
        value: 'amber',
        className: 'bg-amber-500',
    },
    {
        name: 'Cyan',
        value: 'cyan',
        className: 'bg-cyan-500',
    },
    {
        name: 'Emerald',
        value: 'emerald',
        className: 'bg-emerald-500',
    },
    {
        name: 'Fuchsia',
        value: 'fuchsia',
        className: 'bg-fuchsia-500',
    },
    {
        name: 'Green',
        value: 'green',
        className: 'bg-green-500',
    },
    {
        name: 'Indigo',
        value: 'indigo',
        className: 'bg-indigo-500',
    },
    {
        name: 'Lime',
        value: 'lime',
        className: 'bg-lime-500',
    },
    {
        name: 'Orange',
        value: 'orange',
        className: 'bg-orange-500',
    },
    {
        name: 'Pink',
        value: 'pink',
        className: 'bg-pink-500',
    },
] as const;

export default function ThemeColorSelector() {
    const {
        theme,
        setColor,
    } = useTheme();

    return (
        <div className="space-y-3">
            <div>
                <h3 className="text-sm font-medium">
                    Theme color
                </h3>

                <p className="text-muted-foreground text-sm">
                    Select your preferred accent color.
                </p>
            </div>

            <div className="flex gap-3">
                {colors.map((color) => {
                    const active =
                        theme.color === color.value;

                    return (
                        <button
                            key={color.value}
                            type="button"
                            onClick={() =>
                                setColor(color.value)
                            }
                            className={`
                                relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border transition-all
                                ${active
                                    ? 'border-foreground scale-110'
                                    : 'border-border'
                                }
                            `}
                            aria-label={color.name}
                        >
                            <div
                                className={`
                                    h-8 w-8 rounded-full
                                    ${color.className}
                                `}
                            />

                            {active && (
                                <Check
                                    className="
                                        absolute h-4 w-4 text-white
                                    "
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
