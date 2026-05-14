import ServicesTable from '@/components/services/services-table';
import AppTableLayout from '@/layouts/app/app-table-layout';
import services from '@/routes/services';

const Index = () => {

    return (
        <AppTableLayout>
            <ServicesTable />
        </AppTableLayout>
    )
}

export default Index

Index.layout = {
    breadcrumbs: [
        {
            title: 'services',
            href: services.index(),
        },
    ],
};
