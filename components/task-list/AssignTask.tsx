import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import useTaskService from '../../lib/services/task.service';
import { ServiceCallback, Task } from '../../models';
import { useLoading } from '../../lib/context/app.context';
interface AssignTaskProps {
    task: Task;
    className?: string;
    onTaskAssigned?: ServiceCallback;
}

export function AssignTask({ task, className, onTaskAssigned }: AssignTaskProps) {
    const { t } = useTranslation();

    const taskService = useTaskService();
    const { showLoading, hideLoading } = useLoading();

    const handleAssignTask = () => {
        const message = task.available ? t('tasks.actions.assign.confirm') : t('tasks.actions.unassign.confirm');

        if (confirm(message)) {
            showLoading();

            taskService.assignTask(task)
            .then((assigned: string) => {
                hideLoading();
                onTaskAssigned && onTaskAssigned(null, { assigned });
            }).catch(error => {
                hideLoading();
                onTaskAssigned && onTaskAssigned(error);
            });
        }
    };

    return (
        <div className={className}>
            {task.available && (
            <IconButton aria-label={t('tasks.actions.assign.title')} color="primary" onClick={handleAssignTask}>
                <AlternateEmailIcon />
            </IconButton>)}

            {!task.available && (
            <IconButton aria-label={t('tasks.actions.unassign.title')} color="primary" onClick={handleAssignTask}>
                <Badge color="secondary" badgeContent="X">
                    <AlternateEmailIcon />
                </Badge>
            </IconButton>)}
        </div>
    )
}
