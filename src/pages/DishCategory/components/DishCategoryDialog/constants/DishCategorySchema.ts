import * as z from 'zod';

export const dishCategorySchema = z.object({
    name: z.string().min(1, 'Поле должно быть заполнено').max(2000, "Максимум 2000 символов"),
    description: z.string().min(1, 'Поле должно быть заполнено').max(2000, "Максимум 2000 символов")
});

export type DishCategorySchema = z.infer<typeof dishCategorySchema>;