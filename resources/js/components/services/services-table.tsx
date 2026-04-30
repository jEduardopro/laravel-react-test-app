import DataTable from '@/components/common/data-table/data-table';
import { PaginatedServices, Service } from '@/core/types/service';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { getColumns } from './columns';

const ServicesTable = () => {
    const { t } = useTranslation()
    const { services } = usePage<PaginatedServices<Service[]>>().props;
    const columns = getColumns(t)

    return (
        <DataTable routePath='/services' data={services} columns={columns} />
    )
}

export default ServicesTable
