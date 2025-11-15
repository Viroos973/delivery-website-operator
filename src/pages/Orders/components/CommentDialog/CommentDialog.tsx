import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCommentDialog } from "./hooks/useCommentDialog";

interface CommnetDialogProps {
    isComment: boolean;
    setIsComment: (isComment: boolean) => void;
    order: Order;
}

const CommentDialog = ({ isComment, setIsComment, order}: CommnetDialogProps) => {
    const { form, functions } = useCommentDialog(isComment, setIsComment, order);

    return (
        <Dialog open={isComment} onOpenChange={setIsComment}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Комментарий к заказу</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                        <div className="flex flex-col gap-4 items-center">
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormControl>
                                            <Input placeholder="Комментарий к заказу" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className='h-10 w-full cursor-pointer'>
                            {"Сохранить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog;