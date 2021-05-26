import IconButton from '@material-ui/core/IconButton';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { fetcher } from '../../lib/fetchJson';

interface AssignTaskProps {
    taskId: string;
    className?: string;
    onTaskAssigned?: (done: boolean, assigned?: string, error?: Error) => void;
}

export function AssignTask({ taskId, className, onTaskAssigned }: AssignTaskProps) {
    const handleAssignTask = () => {
        fetcher('/api/tasks/assign', { method: 'POST', body: JSON.stringify({ taskId }) })
        .then(({ assigned }: { assigned: string }) => {
            onTaskAssigned && onTaskAssigned(true, assigned);
        }).catch(error => {
            onTaskAssigned && onTaskAssigned(false, undefined, error);
        });
    };

    return (
        <div className={className}>
            <IconButton aria-label="edit task" color="primary" onClick={handleAssignTask}>
                <AlternateEmailIcon />
            </IconButton>
        </div>
    )
}
