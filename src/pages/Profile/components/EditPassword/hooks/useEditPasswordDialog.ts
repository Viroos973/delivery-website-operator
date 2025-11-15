import { useForm } from "react-hook-form"
import { editPasswordShema } from "../constants/EditPasswordShema"
import { useEffect} from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePutEditPasswordMutation } from "@/utils/api/hooks/usePutEditPasswordMutation";
import { Route } from "react-router-dom";


export const useEditPasswordDialog = (
    setIsOpen: (isOpen: boolean) => void,
    isOpen: boolean) => {
    const editPassword = usePutEditPasswordMutation()

    const newPasswordForm = useForm<UserNewPasswordDTO>({
        resolver: zodResolver(editPasswordShema),
        defaultValues: {
            oldPassword1: '',
            newPassword1: '',
            newPassword2: ''
        }
    })
    
    const addNewPassword = newPasswordForm.handleSubmit(
        async (data) => {
            await editPassword.mutateAsync({params: {password: data.oldPassword1, newPassword: data.newPassword1}}, {
                onSuccess:() => {
                    setIsOpen(false)
                },
                onError:() =>{
                    newPasswordForm.setError("root", {
                        type: "manual",
                        message: "Неверные данные"
                    })
                }
            })            
        }
    )

    useEffect(() => {
        if (!isOpen) {
            newPasswordForm.reset({    
                oldPassword1: '',
                newPassword1: '',
                newPassword2: ''
            })
        }
    }, [isOpen])


    return {
        form: newPasswordForm,
        functions: {
            addNewPassword
        }
    }
}