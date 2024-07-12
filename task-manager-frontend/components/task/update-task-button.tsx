import { Dialog } from '../ui/dialog';
import UpdateTaskDialog from './update-task-dialog';

interface UpdateTaskButtonProps {
    isUpdateDialogOpen: boolean;
    setIsUpdateDialogOpen: (isUpdateDialogOpen: boolean) => void;
    id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
}

export default function UpdateTaskButton({
    isUpdateDialogOpen,
    setIsUpdateDialogOpen,
    id,
    title,
    description,
    status,
}: UpdateTaskButtonProps) {
    return (
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
            <UpdateTaskDialog
                taskId={id}
                initialTitle={title}
                initialDescription={description}
                initialStatus={status}
                onClose={() => setIsUpdateDialogOpen(false)}
            />
        </Dialog>
    );
}
