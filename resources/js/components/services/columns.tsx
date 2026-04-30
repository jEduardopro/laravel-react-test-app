import DataTableColumnDate from '@/components/common/data-table/data-table-column-date';
import SortableHeader from "@/components/common/data-table/sortable-header";
import { moneyFormat } from "@/core/helpers/formatter.helper";
import { Service } from "@/core/types/service";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Edit, Trash, Trash2, X } from "lucide-react";
import { Button } from '@/components/ui/button';

export const getColumns = (t: (key: string) => string): ColumnDef<Service>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <SortableHeader column={column} sortField="name" />
        ),
    },
    {
        accessorKey: "duration",
        header: ({ column }) => (
            <SortableHeader column={column} sortField="duration" />
        ),
    },
    {
        accessorKey: "buffer_time",
        header: t('buffer_time'),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <SortableHeader column={column} sortField="price" />
        ),
        cell: ({ row }) => {
            const price = row.original.price
            return <div>{moneyFormat(price)}</div>
        }
    },
    {
        accessorKey: "visible",
        header: t('visible'),
        cell: ({ row }) => (
            row.original.visible ? <Check /> : <X />
        )
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => (
            <SortableHeader column={column} sortField="created_at" label='created_at' />
        ),
        cell: ({ row }) => (
            <DataTableColumnDate date={row.getValue('created_at')} />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {

            return <>
                <div className='flex flex-1 justify-center items-center gap-2'>
                    <Button size={'xs'} variant={'secondary'}>
                        <Edit />
                    </Button>
                    <Button size={'xs'} variant={'destructive'}>
                        <Trash2 />
                    </Button>
                </div>
            </>
        }
    }
];
