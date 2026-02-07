import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { editAboutSchema, type EditAboutSchema } from "../constants/EditAboutShema"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePutEditAboutMutation } from "@/utils/api/hooks/usePutEditAbout";
import { ALWAYS_NOT_SAVE_ABOUT_US, ALWAYS_SAVE_ABOUT_US } from "@/utils/constants/envBugs.ts";

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
        if (!ALWAYS_NOT_SAVE_ABOUT_US) {
            await editAbout.mutateAsync({
                params: {
                    companyName: value.companyName, operatorPhone: value.operatorPhone, managerPhone: value.managerPhone,
                    contactEmail: value.contactEmail, mailAddress: value.mailAddress
                }
            })
        }

        reloadAbout()
        aboutForm.reset()
        setIsOpen(false)
    })

    const handleOpenChange = async (newOpenState: boolean) => {
        if (newOpenState) {
            setIsOpen(true);
            return;
        }

        if (!newOpenState && ALWAYS_SAVE_ABOUT_US) {
            try {
                const isDirty = aboutForm.formState.isDirty;

                if (isDirty) {
                    await onSubmit();
                    return;
                } else {
                    setIsOpen(false);
                }
            } catch (error) {
                console.error("Ошибка при сохранении:", error);
            }
        } else {
            setIsOpen(newOpenState);
        }
    };

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
        functions: { onSubmit, handleOpenChange }
    }
}