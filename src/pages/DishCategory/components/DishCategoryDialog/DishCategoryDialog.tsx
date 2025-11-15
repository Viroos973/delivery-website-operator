import {useDishCategoryDialog} from "@/pages/DishCategory/components/DishCategoryDialog/hooks/useDishCategoryDialog.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import type {
    DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

interface DishCategoryDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    initialData?: DishCategorySchema;
    categoryId?: string;
    reloadCategories: () => void;
}

const DishCategoryDialog = ({ isOpen, setIsOpen, initialData, categoryId, reloadCategories }: DishCategoryDialogProps) => {
    const { form,functions } = useDishCategoryDialog(setIsOpen, reloadCategories, initialData, categoryId)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {categoryId ? "Редактирование категории" : "Создание новой категории"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <p>{"Название категории"}</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Введите название категории"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState?.errors?.name && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {form.formState.errors.name.message}
                                            </p>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <p>{"Описание категории"}</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Введите описание категории"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState?.errors?.description && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {form.formState.errors.description.message}
                                            </p>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='h-10 w-full'>
                            {categoryId ? "Сохранить" : "Добавить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default DishCategoryDialog