import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEditDishDialog } from "./hooks/useEditDishDialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Checkbox } from "@/components/ui/checkbox";
import {Plus, X} from "lucide-react";

interface NewOperatorDialogProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    reloadDishes: () => void;
    dishId?: string;
}

const EditDishDialog = ({ setIsOpen, isOpen, reloadDishes, dishId }: NewOperatorDialogProps) => {
    const { state,
        form,
        functions } = useEditDishDialog(setIsOpen, reloadDishes, dishId);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="mx-auto sm:max-w-md h-[800px] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Редактирование блюда</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-4 items-center">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field, fieldState}) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Название блюда"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Название блюда" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col  gap-2 w-[100%]">
                                <FormLabel className="text-sm font-normal">
                                    {"Категория блюда"}
                                </FormLabel>
                                <Select value={state.selectedCategory} onValueChange={functions.handleSetCategory}>
                                    <SelectTrigger className="!h-10 w-full">
                                        <SelectValue placeholder="Категория блюда"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {state.categories.data?.data.map(category => (
                                                <SelectItem value={category.id}>{category.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.categoryId && (
                                    <p className="text-red-600 text-sm">{form.formState.errors.categoryId.message}</p>
                                )}
                            </div>
                            <FormField
                                control={form.control}
                                name="rate"
                                render={({field, fieldState}) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Рейтинг блюда"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Рейтинг блюда" {...field} type="number"
                                                   onChange={(e) => {
                                                       const value = e.target.value;
                                                       field.onChange(value === "" ? "" : Number(value));
                                                   }}
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field, fieldState}) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Цена блюда"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Цена блюда" {...field} type="number"
                                                   onChange={(e) => {
                                                       const value = e.target.value;
                                                       field.onChange(value === "" ? "" : Number(value));
                                                   }}
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field, fieldState}) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Описание блюда"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Описание блюда" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <div className='space-y-3 w-[100%]'>
                                <p className="text-sm font-normal">{"Фотография блюда"}</p>
                                <div className="flex flex-col gap-2 w-[100%]">
                                    {state.fields.map((photoField, index) => (
                                        <div key={photoField.id} className='flex items-center gap-2'>
                                            <FormField
                                                control={form.control}
                                                name={`photos.${index}`}
                                                render={({field, fieldState}) => (
                                                    <FormItem className="flex-1">
                                                        <FormControl>
                                                            <Input placeholder="Введите url картинки" {...field} />
                                                        </FormControl>
                                                        {fieldState.error && (
                                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                                        )}
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type='button' variant='ghost'
                                                    onClick={() => functions.removePhoto(index)}>
                                                <X color='#F87171'/>
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type='button' variant='ghost' onClick={functions.addPhoto}>
                                        <Plus color='#9CA3AF'/>
                                        <p className="font-normal text-sm text-muted-foreground">
                                            {"Добавить фото"}
                                        </p>
                                    </Button>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="ingredients"
                                render={() => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Ингредиенты блюда"}
                                        </FormLabel>
                                        {state.ingredients.map((ingredient) => (
                                            <FormField
                                                key={ingredient.id}
                                                control={form.control}
                                                name="ingredients"
                                                render={({field}) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(ingredient.id)}
                                                                onCheckedChange={(checked) => {
                                                                    checked
                                                                        ? field.onChange([...field.value, ingredient.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== ingredient.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {ingredient.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className='h-10 w-full'>
                            {"Сохранить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditDishDialog;