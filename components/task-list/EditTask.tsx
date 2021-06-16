import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import useTaskService from '../../lib/services/task.service';
import { ServiceCallback, Task } from '../../models';
import { useLoading } from '../../lib/context/app.context';
import { AppDialog, RenderFunctionParams } from '../dialogs/AppDialog';

import { AddTask } from './AddTask';

type EditDialogProps = {
    open: boolean;
    initialTask: Task;
    onClose: (updatedItem?: Task) => void;
};
function EditDialog({ open, initialTask, onClose }: EditDialogProps) {
    const { t } = useTranslation();
    
    const handleTaskEdit = (task: Task, closeDialog: (result?: Task) => void) => {
        closeDialog(task);
    }

    const handleDialogClose = (result?: Task) => {
        onClose(result);
    }

    return (
        <AppDialog
            open={open}
            title={t('tasks.actions.edit')}
            onClose={handleDialogClose}
            render={({ closeDialog }: RenderFunctionParams<Task>) => (
            
            <div className="p-2">
                <AddTask item={initialTask} editTask={(task: Task) => handleTaskEdit(task, closeDialog)} />
            </div>
        )} />
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
            
            <EditDialog open={open} initialTask={item} onClose={handleModalClose} />
        </>
    )
}
