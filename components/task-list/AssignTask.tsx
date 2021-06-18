import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import useTaskService from '../../lib/services/task.service';
import { ServiceCallback, Task } from '../../models';
import { useLoading } from '../../lib/context/app.context';
import { PromptModal } from '../../components/dialogs/PromptDialog';

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
    const { user } = useUser();
    const assignedTo = user?.name || user?.nickname || user?.email || '';

    const handlePromptClose = (result?: string) => {
        setOpen(false);

        if (result) {
            assignTask(result);
        }
    };

    const assignTask = (assigned: string) => {
        showLoading();

        taskService.assignTask(task, !task.available, assigned)
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
            <PromptModal
                open={open}
                title={t('tasks.actions.assign.title')}
                initialState={assignedTo}
                label={t('tasks.assigned.label')}
                message={t('tasks.actions.assign.warning')}
                onClose={handlePromptClose} />

            <div className={className}>
                <IconButton aria-label={t('tasks.actions.assign.title')} color="primary" onClick={() => setOpen(true)}>
                    <AlternateEmailIcon />
                </IconButton>
            </div>
        </>
    )
}
