import * as z from 'zod';

export const editAboutSchema = z.object({
    companyName: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
    mailAddress: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
    contactEmail: z.email("Введите корректный email"),
    managerPhone: z.string().regex(/^\+?\d{11}$/, "Введите корректный телефон менеджера"),
    operatorPhone: z.string().regex(/^\+?\d{11}$/, "Введите корректный телефон оператора")
})

export type EditAboutSchema = z.infer<typeof editAboutSchema>;