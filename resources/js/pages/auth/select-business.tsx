import { BusinessProps } from '@/core/types/business';
import { Head, router, usePage } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const SelectBusiness = () => {
    const { businesses } = usePage<BusinessProps>().props;

    const handleSelect = (id: string) => {
        router.put('/select-business', {
            business_id: id,
        })
    }

    return (
        <div className="flex bg-muted/40 rounded p-6">
            <Head title="Select Business" />

            <div className="w-full max-w-3xl space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">
                        Selecciona 1 negocio
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Elige el negocio al que deseas acceder
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {businesses.map((b) => (
                        <Card
                            key={b.id}
                            className="cursor-pointer transition hover:shadow-md"
                            onClick={() => handleSelect(b.id)}
                        >
                            <CardHeader>
                                <CardTitle>{b.name}</CardTitle>
                            </CardHeader>

                            <CardContent className="flex flex-col justify-between">

                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleSelect(b.id)
                                    }}
                                >
                                    Seleccionar
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectBusiness

