import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNewOperatorDialog } from "./hooks/useNewOperatorDialog";

interface NewOperatorDialogProps {
    newOperator: NewOperatorDTO;
    reloadOperators: () => void;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

const NewOperatorDialog = ({ newOperator, reloadOperators, setIsOpen, isOpen }: NewOperatorDialogProps) => {
    const { form, functions } = useNewOperatorDialog(newOperator, reloadOperators, setIsOpen, isOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Создание нового оператора</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                        <div className="flex flex-col gap-4 items-center">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"ФИО"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="ФИО" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Пароль"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Пароль" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Номер телефона"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Номер телефона" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Логин"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Логин" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                        {form.formState?.errors?.root && (
                            <p className="text-red-600 text-xs text-center mt-1">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                        <Button type='submit' className='h-10 w-full'>
                            {"Создать"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default NewOperatorDialog;