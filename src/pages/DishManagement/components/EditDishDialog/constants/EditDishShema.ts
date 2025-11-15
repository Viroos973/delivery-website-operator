import * as z from 'zod';

export const editDishSchema = z.object({
    name: z.string().nonempty("Это поле обязательно"),
    categoryId: z.string().nonempty("Выберите категорию"),
    photos: z.array(z.string().min(1, 'Поле должно быть заполнено').url("Введите корректный URL")).optional(),
    rate: z.number("Поле должно быть заполнено")
        .min(0, "Рейтинг должен быть не меньше 0")
        .max(5, "Рейтинг должен быть не больше 5"),
    price: z.number("Поле должно быть заполнено"),
    description: z.string().nonempty("Это поле обязательно"),
    ingredients: z.array(z.string()).nonempty("Это поле обязательно"),
    isAvailable: z.boolean()
})

export type EditDishSchema = z.infer<typeof editDishSchema>;