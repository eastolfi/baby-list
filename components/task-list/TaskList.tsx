import Divider from '@material-ui/core/Divider';
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
    const filteredElements: Array<Task | string> = [
        ...elements.filter(e => !e.done),
        'DIVIDER',
        ...elements.filter(e => e.done)
    ]

    return (
        <List component="ul" className="w-full sm:w-10/12 md:w-8/12 max-h-2/4-screen overflow-y-auto">
            {filteredElements.map((item: Task | string) => {
                if (item === 'DIVIDER') return <Divider key='DIVIDER' className="w-full" variant="middle" />

                const task = item as Task;
                return (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onTaskDone={onTaskDone}
                        onItemEdited={onItemEdited}
                        onTaskAssigned={onTaskAssigned} />
                )
            })}
        </List>
    )
}
