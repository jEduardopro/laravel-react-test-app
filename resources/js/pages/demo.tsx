import { zodResolver } from "@hookform/resolvers/zod"
import { Head } from '@inertiajs/react'
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import type { Payment } from './payments/columns'
import { columns } from './payments/columns'
import { DataTable } from './payments/data-table'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { toast } from "sonner"
import { useState } from "react"
import { X } from "lucide-react"

const formSchema = z.object({
    title: z
        .string()
        .min(5, "Bug title must be at least 5 characters.")
        .max(32, "Bug title must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
})

const Demo = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast.success("You submitted the following values", { closeButton: true, dismissible: true})
    }

    const showToasters = () => {
        toast('You submitted the following values')
        toast.success("You submitted the following values", { closeButton: true, dismissible: true})
        toast.error("You submitted the following values", { closeButton: true, dismissible: true})
        toast.info("You submitted the following values", { closeButton: true, dismissible: true})
        toast.warning("You submitted the following values", { closeButton: true, dismissible: true})
    }

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
                <Drawer
                    open={drawerOpen}
                    dismissible={false}
                    direction={
                        "right"
                    }
                >
                    {/* <DrawerTrigger asChild> */}
                    <Button variant="outline" onClick={() => showToasters()} className="capitalize">
                        Create ticket
                    </Button>
                    {/* </DrawerTrigger> */}
                    <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
                        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                            <DrawerHeader>
                                <DrawerTitle>
                                    <div className="flex w-full">
                                        <p className="flex flex-1">
                                            Move Goal
                                        </p>
                                        <Button type='button' variant="outline" onClick={() => setDrawerOpen(false)}>
                                            <X />
                                        </Button>
                                    </div>
                                </DrawerTitle>
                                <DrawerDescription>
                                    Set your daily activity goal.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="no-scrollbar overflow-y-auto px-4">

                                <FieldGroup>
                                    <Controller
                                        name="title"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Bug Title
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="form-rhf-demo-title"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Login button not working on mobile"
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="description"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-description">
                                                    Description
                                                </FieldLabel>
                                                <InputGroup>
                                                    <InputGroupTextarea
                                                        {...field}
                                                        id="form-rhf-demo-description"
                                                        placeholder="I'm having an issue with the login button on mobile."
                                                        rows={6}
                                                        className="min-h-24 resize-none"
                                                        aria-invalid={fieldState.invalid}
                                                    />
                                                    <InputGroupAddon align="block-end">
                                                        <InputGroupText className="tabular-nums">
                                                            {field.value.length}/100 characters
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <FieldDescription>
                                                    Include steps to reproduce, expected behavior, and what
                                                    actually happened.
                                                </FieldDescription>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                            </div>
                            <DrawerFooter>
                                <Field orientation="horizontal">
                                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                                        Reset
                                    </Button>
                                    <Button type="submit" form="form-rhf-demo">
                                        Submit
                                    </Button>
                                </Field>
                                {/* <Button>Submit</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose> */}
                            </DrawerFooter>
                        </form>

                    </DrawerContent>
                </Drawer>

                <DataTable columns={columns} data={data} />
            </div>

        </>
    )
}

export default Demo
