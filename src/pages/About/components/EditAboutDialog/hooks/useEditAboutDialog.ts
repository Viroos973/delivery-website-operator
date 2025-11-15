import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { editAboutSchema, type EditAboutSchema } from "../constants/EditAboutShema"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePutEditAboutMutation } from "@/utils/api/hooks/usePutEditAbout";

export const useEditAboutDialog = (setIsOpen: (isOpen: boolean) => void, isOpen: boolean,
    reloadAbout: () => void, abouts?: EditAboutSchema) => {

    const editAbout = usePutEditAboutMutation()

    const aboutForm = useForm<About>({
        resolver: zodResolver(editAboutSchema),
        defaultValues: {
            companyName: abouts?.companyName || '',
            operatorPhone: abouts?.operatorPhone || '',
            managerPhone: abouts?.managerPhone || '',
            contactEmail: abouts?.contactEmail || '',
            mailAddress: abouts?.mailAddress || ''
        }
    });

    const onSubmit = aboutForm.handleSubmit(async (value) => {
        await editAbout.mutateAsync({
            params: {
                companyName: value.companyName, operatorPhone: value.operatorPhone, managerPhone: value.managerPhone,
                contactEmail: value.contactEmail, mailAddress: value.mailAddress
            }
        })

        reloadAbout()
        aboutForm.reset()
        setIsOpen(false)
    })

    useEffect(() => {
        if (!isOpen) {
            aboutForm.reset({
                companyName: abouts?.companyName || '',
                operatorPhone: abouts?.operatorPhone || '',
                managerPhone: abouts?.managerPhone || '',
                contactEmail: abouts?.contactEmail || '',
                mailAddress: abouts?.mailAddress || ''
            })
        }
    }, [isOpen, abouts])

    return {
        form: aboutForm,
        functions: { onSubmit }
    }
}