import { useUser } from '@auth0/nextjs-auth0';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

import { Task } from '../../pages/task-list';
import { DisplayTask } from './DisplayTask';
import { EditTask } from './EditTask';

interface TaskItemProps {
    item: Task;
    onTaskDone: (taskId: string) => void;
    onItemEdited: (item: Task) => void;
}

export function TaskItem({ item, onTaskDone, onItemEdited }: TaskItemProps) {
    const handleTaskDone = () => {
        onTaskDone(item.id);
    };

    const TaskDoneButton = () => {
        if (item.done) {
            return (
                <IconButton aria-label="uncomplete task" color="secondary" onClick={handleTaskDone}>
                    <ClearIcon />
                </IconButton>
            )
        } else {
            return (
                <IconButton aria-label="complete task" color="primary" onClick={handleTaskDone}>
                    <DoneIcon />
                </IconButton>
            )
        }
    }

    const { user } = useUser();
    const canModify = (!item.done && item.createdBy && user) ? item.createdBy?.email === user?.email : false;

    const handleTaskEdited = (task: Task) => {
        onItemEdited(task);
    };

    return (
        <ListItem>
            <TaskDoneButton />
            
            <DisplayTask item={item} />

            {canModify && <EditTask className="ml-auto" item={item} onItemEdited={handleTaskEdited} />}
        </ListItem>
    )
}
