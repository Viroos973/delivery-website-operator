import * as z from 'zod';

const commentSchema = z.object({
    comment: z.string().nonempty("Это поле обязательно")
})

export type GetCommentSchema = z.infer<typeof commentSchema>;