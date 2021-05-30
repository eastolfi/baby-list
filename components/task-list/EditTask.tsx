import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { AddTask } from './AddTask';
import { ServiceCallback, Task } from '../../models';
import useTaskService from '../../lib/services/task.service';


function EditModal({ open, item, onClose }: { open: boolean, item: Task, onClose: (updatedItem?: Task) => void }) {
    const handleClose = () => {
        onClose();
    }

    const handleTaskEdit = (task: Task) => {
        onClose(task);
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="Edit Task" open={open}>
            <DialogTitle id="editTaskTitle">Editar elemento</DialogTitle>
            <div className="p-2">
                <AddTask item={item} editTask={handleTaskEdit} />
            </div>
        </Dialog>
    )
}

type EditTaskProps = {
    item: Task;
    className?: string;
    onItemEdited?: ServiceCallback;
}

export function EditTask({ item, className, onItemEdited }: EditTaskProps) {
    const [open, setOpen] = useState(false);
    const taskService = useTaskService();

    const handleOpenModalEdit = () => {
        setOpen(true);
    };

    const handleModalClose = (updatedItem?: Task) => {
        setOpen(false);
        
        if (updatedItem) {
            taskService.editTask(updatedItem)
            .then(() => {
                onItemEdited && onItemEdited(null);
            }).catch(error => {
                console.error(error);
                onItemEdited && onItemEdited(error);
            });
        }
    };
    
    return (
        <>
            <div className={className}>
                <IconButton aria-label="edit task" color="secondary" onClick={handleOpenModalEdit}>
                    <EditIcon />
                </IconButton>
            </div>
            
            <EditModal open={open} item={item} onClose={handleModalClose} />
        </>
    )
}
