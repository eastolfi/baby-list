import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import useTaskService from '../../lib/services/task.service';
import { ServiceCallback, Task } from '../../models';
import { useLoading } from '../../lib/context/app.context';
import { ConfirmModal } from '../../components/dialogs/ConfirmDialog';

interface AssignTaskProps {
    task: Task;
    className?: string;
    onTaskAssigned?: ServiceCallback;
}

export function UnassignTask({ task, className, onTaskAssigned }: AssignTaskProps) {
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

        taskService.assignTask(task, true)
        .then((assigned: string) => {
            hideLoading();
            onTaskAssigned && onTaskAssigned(null, { assigned });
        }).catch(error => {
            hideLoading();
            onTaskAssigned && onTaskAssigned(error);
        });
    };

    return (
        <>
            <ConfirmModal open={open} title={t('tasks.actions.unassign.title')} body={t('tasks.actions.unassign.confirm')} onClose={handleConfirmClose} />

            <div className={className}>
                <IconButton aria-label={t('tasks.actions.unassign.title')} color="primary" onClick={() => setOpen(true)}>
                    <Badge color="secondary" badgeContent="X">
                        <AlternateEmailIcon />
                    </Badge>
                </IconButton>
            </div>
        </>)
}
