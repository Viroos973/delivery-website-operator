import * as z from 'zod';

export const reasonSchema = z.object({
    reason: z.string().min(1, "Это поле обязательно")
})

export type GetReasonSchema = z.infer<typeof reasonSchema>;