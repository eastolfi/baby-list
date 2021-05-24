import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

import { Task } from '../../pages/task-list';
import { DisplayTask } from './DisplayTask';

interface TaskItemProps {
    item: Task;
    onTaskDone: (taskId: string) => void;
}

export function TaskItem({ item, onTaskDone }: TaskItemProps) {
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

    return (
        <ListItem>
            <TaskDoneButton />
            
            <DisplayTask item={item} />
        </ListItem>
    )
}
