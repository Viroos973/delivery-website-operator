import * as z from 'zod';

export const loginOperatorSchema = z.object({
    username: z.string().min(1, 'Поле должно быть заполнено'),
    password: z.string().min(1, 'Поле должно быть заполнено')
});

export type LoginOperatorSchema = z.infer<typeof loginOperatorSchema>;