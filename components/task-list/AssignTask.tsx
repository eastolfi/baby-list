import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import useTaskService from '../../lib/services/task.service';
import { ServiceCallback, Task } from '../../models';
import { useLoading } from '../../lib/context/app.context';
import { ConfirmModal } from '../../components/dialogs/ConfirmDialog';
import { useState } from 'react';
interface AssignTaskProps {
    task: Task;
    className?: string;
    onTaskAssigned?: ServiceCallback;
}

export function AssignTask({ task, className, onTaskAssigned }: AssignTaskProps) {
    const { t } = useTranslation();

    const taskService = useTaskService();
    const { showLoading, hideLoading } = useLoading();
    const [ open, setOpen ] = useState(false);

    const handleConfirmClose = (result?: boolean) => {
        setOpen(false);
        
        if (result) {
            assignTask();
        }
    };

    const assignTask = () => {
        showLoading();

        taskService.assignTask(task, !task.available)
        .then((assigned: string) => {
            hideLoading();
            onTaskAssigned && onTaskAssigned(null, { assigned });
        }).catch(error => {
            hideLoading();
            onTaskAssigned && onTaskAssigned(error);
        });
    };

    const title = task.available ? t('tasks.actions.assign.title') : t('tasks.actions.unassign.title');
    const modalBody = task.available ? t('tasks.actions.assign.confirm') : t('tasks.actions.unassign.confirm');
    return (
        <>
            <ConfirmModal title={title} body={modalBody} open={open} onClose={handleConfirmClose} />

            <div className={className}>
                {task.available && (
                    <IconButton aria-label={title} color="primary" onClick={() => setOpen(true)}>
                        <AlternateEmailIcon />
                    </IconButton>)}

                {!task.available && (
                    <IconButton aria-label={title} color="primary" onClick={() => setOpen(true)}>
                    <Badge color="secondary" badgeContent="X">
                        <AlternateEmailIcon />
                    </Badge>
                </IconButton>)}
            </div>
        </>
    )
}
