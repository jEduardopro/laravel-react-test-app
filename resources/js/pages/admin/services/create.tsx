import CreateUpdateServiceForm from "@/components/services/create-update-service-form"
import services from '@/routes/services'

export default function Create() {
    return (
        <CreateUpdateServiceForm />
    )
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'services',
            href: services.index(),
        },
        {
            title: 'new_service'
        }
    ],
};
