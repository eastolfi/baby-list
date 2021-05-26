import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import { fetcher } from '../../lib/fetchJson';
import { Task } from '../../pages/task-list';
interface AssignTaskProps {
    task: Task;
    className?: string;
    onTaskAssigned?: (done: boolean, assigned?: string, error?: Error) => void;
}

export function AssignTask({ task, className, onTaskAssigned }: AssignTaskProps) {
    const handleAssignTask = () => {
        const message = task.available ? '¿Quieres asignarte a esta tarea? Si no has creado esta tarea, no podrás desasignarte después.' :
        '¿Quieres deasignarte de esta tarea?';

        if (confirm(message)) {
            fetcher('/api/tasks/assign', { method: 'POST', body: JSON.stringify({ taskId: task.id }) })
            .then(({ assigned }: { assigned: string }) => {
                onTaskAssigned && onTaskAssigned(true, assigned);
            }).catch(error => {
                onTaskAssigned && onTaskAssigned(false, undefined, error);
            });
        }
    };

    return (
        <div className={className}>
            {task.available && (
            <IconButton aria-label="assign task" color="primary" onClick={handleAssignTask}>
                <AlternateEmailIcon />
            </IconButton>)}

            {!task.available && (
            <IconButton aria-label="unassign task" color="primary" onClick={handleAssignTask}>
                <Badge color="secondary" badgeContent="X">
                    <AlternateEmailIcon />
                </Badge>
            </IconButton>)}
        </div>
    )
}
