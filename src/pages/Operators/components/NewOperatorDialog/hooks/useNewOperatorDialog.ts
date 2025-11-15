import { useForm } from "react-hook-form"
import { newOperatorSchema } from "../constants/NewOperatorShema"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostCreateOperatorMutation } from "@/utils/api/hooks/usePostCreateOperatotMutation";

export const useNewOperatorDialog = (newOperator: NewOperatorDTO, reloadOperators: () => void,
    setIsOpen: (isOpen: boolean) => void, isOpen: boolean) => {
    const createOperator = usePostCreateOperatorMutation()

    const newOperatorForm = useForm<NewOperatorDTO>({
        resolver: zodResolver(newOperatorSchema),
        defaultValues: {
            fullName: newOperator.fullName || '',
            password: newOperator.password || '',
            phone: newOperator.phone || '',
            username: newOperator.username || ''
        }
    })

    const onSubmit = newOperatorForm.handleSubmit(async (value) => {
        try {
            await createOperator.mutateAsync({
                params: {
                    fullName: value.fullName, password: value.password,
                    phone: value.phone, username: value.username
                }
            })

            reloadOperators()
            newOperatorForm.reset()
            setIsOpen(false)
        } catch (e) {
            newOperatorForm.setError('root', {
                type: 'manual',
                message: 'Неверные данные'
            });
        }
    })

    useEffect(() => {
        if (!isOpen) {
            newOperatorForm.reset({
                fullName: '',
                password: '',
                phone: '',
                username: ''
            })
        }
    }, [isOpen])

    return {
        form: newOperatorForm,
        functions: { onSubmit }
    }
}