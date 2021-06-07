import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import useTaskService from '../../lib/services/task.service';
import { ServiceCallback, Task } from '../../models';
import { useLoading } from '../../lib/context/app.context';

import { AddTask } from './AddTask';

function EditModal({ open, item, onClose }: { open: boolean, item: Task, onClose: (updatedItem?: Task) => void }) {
    const { t } = useTranslation();
    
    const handleClose = () => {
        onClose();
    }

    const handleTaskEdit = (task: Task) => {
        onClose(task);
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby={t('tasks.actions.edit')} open={open}>
            <DialogTitle id="editTaskTitle">{t('tasks.actions.edit')}</DialogTitle>

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
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const taskService = useTaskService();
    const { showLoading, hideLoading } = useLoading();

    const handleOpenModalEdit = () => {
        setOpen(true);
    };

    const handleModalClose = (updatedItem?: Task) => {
        setOpen(false);
        
        if (updatedItem) {
            showLoading();

            taskService.editTask(updatedItem)
            .then(() => {
                hideLoading();
                onItemEdited && onItemEdited(null);
            }).catch(error => {
                hideLoading();
                console.error(error);
                onItemEdited && onItemEdited(error);
            });
        }
    };
    
    return (
        <>
            <div className={className}>
                <IconButton aria-label={t('tasks.actions.edit')} color="secondary" onClick={handleOpenModalEdit}>
                    <EditIcon />
                </IconButton>
            </div>
            
            <EditModal open={open} item={item} onClose={handleModalClose} />
        </>
    )
}
