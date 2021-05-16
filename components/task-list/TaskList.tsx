import { ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { Task } from '../../pages/task-list';
import { TaskItem } from './TaskItem';

interface TaskListElementsProps {
    elements: Task[];
    onTaskDone: (taskId: string) => void;
}

export function TaskList({ elements, onTaskDone }: TaskListElementsProps) {
    return (
        <List component="ul" className="w-5/12">
            <ListItem>
                <IconButton disabled aria-label="uncomplete task" color="secondary">
                    <DoneAllIcon />
                </IconButton>
                <ListItemText className="italic">Complete All</ListItemText>
            </ListItem>

            {elements.map((item: Task) => (
                <TaskItem key={item.id} item={item} onTaskDone={onTaskDone} />
            ))}
        </List>
    )
}
