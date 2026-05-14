import * as z from "zod"

export const serviceFormSchema = z.object({
    name: z.string({ message: "validation.required" }).min(3, { message: "validation.min_char" }),
    description: z.string().min(0, { message: "validation.min_char" }),

    duration: z.coerce
        .number()
        .positive({ message: "validation.invalid_value" })
        .min(1, { message: "validation.min" })
        .max(1440, { message: "validation.max_value" }),

    buffer_time: z.coerce
        .number()
        .positive({ message: "validation.invalid_value" })
        .min(0, { message: "validation.min" })
        .max(1440, { message: "validation.max_value" }),

    price: z.coerce
        .number()
        .positive({ message: "validation.invalid_value" })
        .min(0, { message: "validation.min" })
        .max(10000000, { message: "validation.max" }),

    visible: z.boolean().default(true)
})
