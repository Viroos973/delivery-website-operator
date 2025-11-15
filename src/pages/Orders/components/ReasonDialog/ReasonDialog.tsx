import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useReasonDialog } from "./hooks/useReasonDialog";

interface ReasonDialogProps {
    isReason: boolean;
    setIsReason: (isComment: boolean) => void;
    order: Order;
    reloadOrder: () => void;
}

const ReasonDialog = ({ isReason, setIsReason, order, reloadOrder }: ReasonDialogProps) => {
    const { form, functions } = useReasonDialog(isReason, setIsReason, order, reloadOrder);

    return (
        <Dialog open={isReason} onOpenChange={setIsReason}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Причина</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                        <div className="flex flex-col gap-4 items-center">
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormControl>
                                            <Input placeholder="Причина отмены заказа" {...field} />
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

export default ReasonDialog;