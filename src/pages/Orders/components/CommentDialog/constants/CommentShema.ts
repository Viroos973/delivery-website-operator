import * as z from 'zod';

export const commentSchema = z.object({
    comment: z.string().min(1, "Это поле обязательно").max(2000, "Максимум 2000 символов")
})

export type GetCommentSchema = z.infer<typeof commentSchema>;