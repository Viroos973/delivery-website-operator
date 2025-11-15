import * as z from 'zod';

const reasonSchema = z.object({
    reason: z.string().nonempty("Это поле обязательно")
})

export type GetReasonSchema = z.infer<typeof reasonSchema>;