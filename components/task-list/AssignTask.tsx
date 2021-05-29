import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import useTaskService from '../../lib/services/task.service';
import { ServiceCallback, Task } from '../../models';
interface AssignTaskProps {
    task: Task;
    className?: string;
    onTaskAssigned?: ServiceCallback;
}

export function AssignTask({ task, className, onTaskAssigned }: AssignTaskProps) {
    const taskService = useTaskService();

    const handleAssignTask = () => {
        const message = task.available ? '¿Quieres asignarte a esta tarea? Si no has creado esta tarea, no podrás desasignarte después.' :
        '¿Quieres deasignarte de esta tarea?';

        if (confirm(message)) {
            taskService.assignTask(task)
            .then((assigned: string) => {
                onTaskAssigned && onTaskAssigned(null, { assigned });
            }).catch(error => {
                onTaskAssigned && onTaskAssigned(error);
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