import * as z from 'zod';

export const commentSchema = z.object({
    comment: z.string().min(1, "Это поле обязательно")
})

export type GetCommentSchema = z.infer<typeof commentSchema>;