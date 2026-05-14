import DataTableColumnDate from '@/components/common/data-table/data-table-column-date';
import SortableHeader from "@/components/common/data-table/sortable-header";
import { formatMinutes, moneyFormat } from "@/core/helpers/formatter.helper";
import { Service } from "@/core/types/service";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Edit, Trash, Trash2, X } from "lucide-react";
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import DeleteAlertDialog from '../common/delete-alert-dialog';

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
        cell: ({ row }) => {
            return (
                <div>{formatMinutes(row.original.duration)}</div>
            );
        }
    },
    {
        accessorKey: "buffer_time",
        header: t('buffer_time'),
        cell: ({ row }) => {
            return (
                <div>{formatMinutes(row.original.buffer_time)}</div>
            );
        }
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
                    <Button className='cursor-pointer' onClick={() => router.visit(`/services/${row.original.id}/edit`)} size={'xs'} variant={'secondary'}>
                        <Edit />
                    </Button>
                    <DeleteAlertDialog resource='services' model={row.original} />
                </div>
            </>
        }
    }
];
