import FormError from "@/components/common/forms/form-error"
import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { Switch } from "@/components/ui/switch"
import { serviceFormSchema } from "@/core/schema/service-schema"
import { ServiceProps } from "@/core/types/service"
import { store, update } from '@/routes/services'
import { zodResolver } from "@hookform/resolvers/zod"
import { Head, router, usePage } from "@inertiajs/react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

const CreateUpdateServiceForm = () => {
    const { service } = usePage<ServiceProps>().props;
    const { t } = useTranslation()

    const { handleSubmit, reset, setValue, control } = useForm({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: {
            name: "",
            description: "",
            duration: "",
            buffer_time: "",
            price: "",
            visible: true
        },
    })

    useEffect(() => {
        if (!service) return

        reset({
            name: service.name,
            description: service.description ?? "",
            duration: service.duration,
            buffer_time: service.buffer_time,
            price: service.price,
            visible: service.visible
        })
    }, [service])

    const onSubmit = handleSubmit(
        (values) => {
            const route = service ? update(service.id) : store()

            router.visit(route.url, {
                method: route.method,
                data: values,

                onSuccess: () => {
                    const msgToast = service ? 'service_updated_successfully' : 'service_created_successfully'
                    toast.success(t(msgToast))
                    reset()
                },

                onError: (errors) => {
                    console.log(errors)
                },
            })
        },

        (errors) => {
            console.log(errors)
        }
    )


    return (
        <>
            <Head title={t(`${service ? 'edit_service' : 'create_service'}`)} />

            <div className="container mx-auto max-w-7xl">
                <form className="w-full overflow-y-auto relative h-[80vh] box-border" onSubmit={onSubmit}>
                    <div className="flex items-center sticky top-0 left-0 z-50 bg-white/10 backdrop-blur justify-between w-full p-4 border-b mb-2">
                        <p>{t(`${service ? 'edit_service' : 'create_service'}`)}</p>

                        <Button className="cursor-pointer" type="submit">
                            {t(`${service ? 'save' : 'create'}`)}
                        </Button>
                    </div>

                    <FieldGroup className="p-5">
                        {/* NAME */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>{t('name')} *</FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder={t('service_name_placeholder')}
                                    />
                                    <FormError error={fieldState.error} params={{ field: t('name'), min: 3 }} />
                                </Field>
                            )}
                        />

                        {/* DESCRIPTION */}
                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>{t('description')}</FieldLabel>

                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            rows={4}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText>
                                                {field.value.length}/500
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FormError error={fieldState.error} params={{ field: t('description'), min: 10 }} />
                                </Field>
                            )}
                        />

                        <div className="flex flex-col 2xl:flex-row gap-3">

                            {/* DURATION */}
                            <Controller
                                name="duration"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>{t('duration')} *</FieldLabel>

                                        <InputGroup>
                                            <InputGroupInput
                                                type="number"
                                                placeholder={t('duration')}
                                                {...field}
                                                value={
                                                    typeof field.value === "number" || typeof field.value === "string"
                                                        ? field.value
                                                        : ""
                                                }
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupText>mins</InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        <FormError error={fieldState.error} params={{ field: t('duration'), max: 1440 }} />
                                    </Field>
                                )}
                            />

                            {/* BUFFER */}
                            <Controller
                                name="buffer_time"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>{t('buffer_time')} <span className="text-xs font-normal">({t('time_between_dates')})</span></FieldLabel>

                                        <InputGroup>
                                            <InputGroupInput
                                                type="number"
                                                placeholder={t('buffer_time')}
                                                {...field}
                                                value={typeof field.value === "number" || typeof field.value === "string"
                                                    ? field.value
                                                    : ""}
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupText>mins</InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        <FormError error={fieldState.error} params={{ field: t('buffer_time'), max: 1440 }} />
                                    </Field>
                                )}
                            />

                            {/* COST */}
                            <Controller
                                name="price"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>{t('price')}</FieldLabel>

                                        <InputGroup>
                                            <InputGroupAddon>
                                                <InputGroupText>$</InputGroupText>
                                            </InputGroupAddon>

                                            <InputGroupInput
                                                type="number"
                                                placeholder="0.00"
                                                {...field}
                                                value={typeof field.value === "number" || typeof field.value === "string"
                                                    ? field.value
                                                    : ""}
                                            />

                                            <InputGroupAddon align="inline-end">
                                                <InputGroupText>MXN</InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        <FormError error={fieldState.error} params={{ field: t('price'), max: 10000000 }} />
                                    </Field>
                                )}
                            />

                        </div>

                        {/* Visible */}
                        <Controller
                            name="visible"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field
                                    orientation="horizontal"
                                    data-invalid={fieldState.invalid}
                                >
                                    <Switch
                                        className="cursor-pointer"
                                        id="form-visible"
                                        name={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldContent>
                                        <FieldLabel htmlFor="form-visible">
                                            {t("service.hidden.label")}
                                        </FieldLabel>
                                        <FieldDescription>
                                            {t("service.hidden.description")}
                                        </FieldDescription>
                                    </FieldContent>
                                </Field>
                            )}
                        />
                    </FieldGroup>

                </form>
            </div>
        </>
    )
}

export default CreateUpdateServiceForm
