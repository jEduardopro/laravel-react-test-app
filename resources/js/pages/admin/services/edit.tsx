import CreateUpdateServiceForm from "@/components/services/create-update-service-form"
import services from '@/routes/services'

const Edit = () => {

    return (
        <CreateUpdateServiceForm />        
    )
}

export default Edit


Edit.layout = {
    breadcrumbs: [
        {
            title: 'services',
            href: services.index(),
        },
        {
            title: 'edit_service'
        }
    ],
};
