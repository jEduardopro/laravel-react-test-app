import { Button } from '@/components/ui/button';
import { SharedPageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Props<TData> = {
    column: Column<TData, unknown>;
    sortField: string;
    label?: string;
}

const SortableHeader = <TData,>(props: Props<TData>) => {
    const { t } = useTranslation()
    const queryParams = usePage<SharedPageProps>().props.queryParams || {};

    const isSorted = queryParams?.sort_field === props.sortField;
    const isAsc = isSorted && queryParams?.sort_direction === 'asc';

    return (
        <Button
            variant={'ghost'}
            className={`capitalize ${isSorted ? 'bg-slate-100 dark:bg-slate-600' : ''}`}
            onClick={() => props.column!.toggleSorting(props.column!.getIsSorted() === 'asc')}
        >
            {props.label ? t(props.label) : t(props.sortField)}
            {!isSorted && <ArrowUpDown className='ml-2 w-4 h-4' />}
            {isAsc
                ? <ArrowUp className={`ml-2 w-4 h-4 ${!isSorted ? 'opacity-0 group-hover:opacity-100 transition-opacity' : ''}`} />
                : <ArrowDown className={`ml-2 w-4 h-4 ${!isSorted ? 'opacity-0 group-hover:opacity-100 transition-opacity' : ''}`} />
            }
        </Button>
    )
}

export default SortableHeader
