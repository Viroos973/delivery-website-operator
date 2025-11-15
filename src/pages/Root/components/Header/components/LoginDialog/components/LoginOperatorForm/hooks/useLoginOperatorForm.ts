import {useAuth} from "@/utils/contexts/auth";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    loginOperatorSchema,
    type LoginOperatorSchema
} from "@/pages/Root/components/Header/components/LoginDialog/components/LoginOperatorForm/constants/LoginOperatorSchema.ts";
import {usePostLoginOperatorMutation} from "@/utils/api/hooks/usePostLoginOperatorMutation.ts";

export const useLoginOperatorForm = (setIsOpen: (isOpen: boolean) => void) => {
    const login = usePostLoginOperatorMutation()
    const { login: handleLogin } = useAuth()

    const loginForm = useForm<LoginOperatorSchema>({
        resolver: zodResolver(loginOperatorSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = loginForm.handleSubmit(async (value) => {
        try {
            const token = await login.mutateAsync({
                params: {
                    username: value.username,
                    password: value.password
                }
            });

            handleLogin(token.data.accessToken, token.data.refreshToken)
            loginForm.reset();
            setIsOpen(false);
        } catch {
            loginForm.setError('root', {
                type: 'manual',
                message: 'Неверные данные'
            });
        }
    })

    return {
        form: loginForm,
        functions: { onSubmit }
    }
}