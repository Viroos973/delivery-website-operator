import * as z from 'zod';

export const newDishSchema = z.object({
    name: z.string().nonempty("Это поле обязательно"),
    categoryId: z.string().nonempty("Выберите категорию"),
    photos: z.array(z.string().min(1, 'Поле должно быть заполнено').url("Введите корректный URL")).optional(),
    price: z.number("Поле должно быть заполнено"),
    description: z.string().nonempty("Это поле обязательно"),
    ingredients: z.array(z.string()).nonempty("Это поле обязательно")
})

export type NewDishSchema = z.infer<typeof newDishSchema>;