import { ReactNode } from 'react';

type AppTableLayoutProps = {
    children: ReactNode;
}
const AppTableLayout = ({ children }: AppTableLayoutProps) => {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col">
                    <div className="relative h-[84vh] 2xl:h-[85vh] overflow-y-auto px-3 py-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppTableLayout
