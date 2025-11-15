import * as z from 'zod';

export const newOperatorSchema = z.object({
    fullName: z.string().min(3, "Минимум 3 символа").max(255, "Максимум 255 символов"),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, "Введите корректный пароль"),
    phone: z.string().regex(/^(?:\+?7|8)\d{10}$/, "Введите корректный номер телефона"),
    username: z.string().min(3, "Минимум 3 символа").max(100, "Максимум 100 символов")
})

export type NewOperatorSchema = z.infer<typeof newOperatorSchema>;