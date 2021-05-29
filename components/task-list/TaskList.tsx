import List from '@material-ui/core/List';

import { ServiceCallback, Task } from '../../models';

import { TaskItem } from './TaskItem';

interface TaskListElementsProps {
    elements: Task[];
    onTaskDone?: ServiceCallback;
    onItemEdited?: ServiceCallback;
    onTaskAssigned?: ServiceCallback;
}

export function TaskList({ elements, onTaskDone, onItemEdited, onTaskAssigned }: TaskListElementsProps) {
    return (
        <List component="ul" className="w-full sm:w-10/12 md:w-8/12 max-h-2/4-screen overflow-y-auto">
            {elements.map((item: Task) => (
                <TaskItem
                    key={item.id}
                    task={item}
                    onTaskDone={onTaskDone}
                    onItemEdited={onItemEdited}
                    onTaskAssigned={onTaskAssigned} />
            ))}
        </List>
    )
}
