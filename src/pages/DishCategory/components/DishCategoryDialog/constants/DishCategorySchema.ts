import * as z from 'zod';

export const dishCategorySchema = z.object({
    name: z.string().min(1, 'Поле должно быть заполнено'),
    description: z.string().min(1, 'Поле должно быть заполнено')
});

export type DishCategorySchema = z.infer<typeof dishCategorySchema>;