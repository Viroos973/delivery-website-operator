import * as z from 'zod';

export const reasonSchema = z.object({
    reason: z.string().min(1, "Это поле обязательно").max(2000, "Максимум 2000 символов")
})

export type GetReasonSchema = z.infer<typeof reasonSchema>;