import * as z from 'zod';

export const newDishSchema = z.object({
    name: z.string().nonempty("Это поле обязательно"),
    categoryId: z.string().nonempty("Выберите категорию"),
    photos: z.array(z.string().min(1, 'Поле должно быть заполнено').max(1000, "Максимум 1000 символов").url("Введите корректный URL")).optional(),
    price: z.number("Поле должно быть заполнено"),
    description: z.string().min(1, "Поле должно быть заполнено").max(2000, "Максимум 2000 символов"),
    ingredients: z.array(z.string()).nonempty("Это поле обязательно")
})

export type NewDishSchema = z.infer<typeof newDishSchema>;