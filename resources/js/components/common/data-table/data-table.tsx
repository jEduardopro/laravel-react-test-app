import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedResponse, PaginatioDataParams } from '@/core/types/pagination';
import { router, SharedPageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: PaginatedResponse<TData[]>;
    routePath: string;
}

const DataTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {
    const { t } = useTranslation()
    const pageProps = usePage<SharedPageProps>().props;
    console.log('datatable:', { pageProps: pageProps.queryParams });
    const paginationParams = pageProps.queryParams
    const sortingParam = useMemo(() => {
        if (!paginationParams) {
            return []
        }

        if (paginationParams.sort_field && paginationParams.sort_direction) {
            return [
                {
                    desc: paginationParams.sort_direction === 'desc',
                    id: paginationParams.sort_field
                }
            ]
        }

        return []
    }, [paginationParams])

    const [sorting, setSorting] = useState<SortingState>(sortingParam)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const pageSizes = [15, 30, 50, 100];
    const [query, setQuery] = useState<string | null>(paginationParams?.pattern || '')

    const paginationDataState = useMemo(() => {
        return {
            page: paginationParams?.page || 1,
            per_page: paginationParams?.per_page || 15,
            // total_pages: pagination.total_pages || 0,
            // next_page: pagination.next_page || null
        } as PaginatioDataParams
    }, [paginationParams])

    const [paginationTable, setPagination] = useState<PaginationState>({
        pageIndex: paginationDataState.page - 1,
        pageSize: paginationDataState.per_page
    })
    const [isReFetch, setIsReFetch] = useState(false)

    const reFetchData = (overridePage: number | null = null, pattern: string | undefined = undefined) => {
        const queryParams: Record<string, any> = {
            page: overridePage !== null ? overridePage : paginationTable.pageIndex + 1,
            per_page: paginationTable.pageSize,
            sort_field: sorting[0]?.id,
            sort_direction: sorting.length == 0 ? undefined : (sorting[0]?.desc ? "desc" : "asc"),
            pattern: undefined
        }

        if (pattern !== undefined) {
            queryParams.pattern = pattern
        }

        setIsReFetch(false)
        // if (props.extraFilters) {
        //     Object.entries(props.extraFilters).forEach(([key, value]) => {
        //         if (value != null && !(key in queryParams)) {
        //             queryParams[key] = value
        //         }
        //     })
        // }

        router.get(
            props.routePath,
            queryParams,
            { preserveState: false, preserveScroll: true }
        )
    }

    useEffect(() => {
        if (!isReFetch) {
            return;
        }

        reFetchData()
    }, [paginationTable, sorting, isReFetch])

    const table = useReactTable({
        data: props.data.data,
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        pageCount: props.data.meta.last_page,

        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,

        onPaginationChange: updater => {
            if (typeof updater === 'function') {
                const newPaginationState = updater(paginationTable)
                setPagination(newPaginationState)
            } else {
                setPagination(updater)
            }

            setIsReFetch(true)

        },

        onSortingChange: updaterOrValue => {
            if (typeof updaterOrValue === 'function') {
                const newSortingState = updaterOrValue(sorting)
                setSorting(newSortingState)
            } else {
                setSorting(updaterOrValue)
            }
            setIsReFetch(true)

        },

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination: paginationTable
        }
    })

    return (
        <>
            <div className="w-full flex flex-col h-[67vh] 2xl:h-[70vh] justify-start">
                <div className="flex flex-col relative overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className='sticky top-0 bg-white dark:bg-slate-800 shadow z-50'>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={props.columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="w-full">
                <div className="flex items-center justify-end space-x-2 pt-4 pb-2">
                    <div className="w-1/3 text-sm text-muted-foreground">
                        {props.data.meta.from} - {props.data.meta.to} {' '} {t('of')} {' '}
                        {props.data.meta.total} {t('record')}(s).
                    </div>
                    <div className="flex flex-1 justify-end">
                        <div className="items-center gap-2 flex w-60">
                            <Label htmlFor="rows-per-page" className="text-sm text-muted-foreground">
                                {t('rows_per_page')}
                            </Label>
                            <Select value={table.getState().pagination.pageSize.toString()} onValueChange={(val) => {
                                if (val !== null) {
                                    table.setPageSize(parseInt(val as string))
                                }
                            }}>
                                <SelectTrigger size="sm" className="w-20 h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {pageSizes.map((size) => (
                                        <SelectItem
                                            key={size}
                                            value={String(size)}
                                            className="cursor-pointer"
                                        >
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm" disabled={!table.getCanPreviousPage()}
                                onClick={() => table.previousPage()}
                            >
                                {t('previous')}
                            </Button>

                            {
                                props.data.meta.links.filter(l => !l.label.toLowerCase().includes('previous') && !l.label.toLowerCase().includes('next')).map((p, idx) => (
                                    <Button
                                        key={p.url ?? Math.random().toString()}
                                        variant="outline"
                                        className='cursor-pointer'
                                        size="sm"
                                        disabled={p.active}
                                        onClick={() => table.setPageIndex(idx)}
                                    >
                                        {p.label}
                                    </Button>
                                ))
                            }

                            <Button variant="outline" size="sm" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                                {t('next')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
