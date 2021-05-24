import List from '@material-ui/core/List';

import { Task } from '../../pages/task-list';
import { TaskItem } from './TaskItem';

interface TaskListElementsProps {
    elements: Task[];
    onTaskDone: (taskId: string) => void;
}

export function TaskList({ elements, onTaskDone }: TaskListElementsProps) {
    return (
        <List component="ul" className="w-full sm:w-5/12">
            {elements.map((item: Task) => (
                <TaskItem key={item.id} item={item} onTaskDone={onTaskDone} />
            ))}
        </List>
    )
}
