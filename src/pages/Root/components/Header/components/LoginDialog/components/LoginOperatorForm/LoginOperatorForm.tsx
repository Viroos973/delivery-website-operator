import {useLoginOperatorForm} from "./hooks/useLoginOperatorForm.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

interface LoginOperatorFormProps {
    setIsOpen: (isOpen: boolean) => void;
}

const LoginOperatorForm = ({ setIsOpen }: LoginOperatorFormProps) => {
    const { form, functions } = useLoginOperatorForm(setIsOpen)

    return (
        <Form {...form}>
            <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <p>{"Логин оператора"}</p>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Введите логин оператора"
                                />
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.username && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.username.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <p>{"Пароль"}</p>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Введите пароль"
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.password && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.password.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                {form.formState?.errors?.root && (
                    <p className="text-red-600 text-center mt-1">
                        {form.formState.errors.root.message}
                    </p>
                )}
                <Button type='submit' className='h-10 w-full cursor-pointer'>
                    {"Войти"}
                </Button>
            </form>
        </Form>
    )
}

export default LoginOperatorForm