import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

interface CancelDeleteDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CancelDeleteDialog = ({ isOpen, setIsOpen }: CancelDeleteDialogProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-red-500 text-center">
                    {"Ошибка при удалении"}
                </DialogTitle>
                <DialogDescription className="text-center text-black">
                    {"Категорию невозможно удалить, так как блюда этой категории есть в меню"}
                </DialogDescription>
            </DialogHeader>
            <Button type='button' className='h-10 w-full' onClick={() => setIsOpen(false)}>
                {"Закрыть"}
            </Button>
        </DialogContent>
    </Dialog>
)

export default CancelDeleteDialog;