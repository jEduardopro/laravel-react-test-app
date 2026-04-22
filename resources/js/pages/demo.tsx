import { Head } from '@inertiajs/react'
import type { Payment } from './payments/columns'
import { columns } from './payments/columns'
import { DataTable } from './payments/data-table'


const Demo = () => {

    const data: Payment[] = [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
    ];

    return (
        <>
            <Head title='Demo Page' />
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>

        </>
    )
}

export default Demo
