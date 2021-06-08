import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import { ServiceCallback, Task } from '../../models';
import { useUser as useConnectedUser } from '../../lib/context/app.context';

import { TaskItem } from './TaskItem';

interface TaskListElementsProps {
    elements: Task[];
    onTaskDone?: ServiceCallback;
    onItemEdited?: ServiceCallback;
    onTaskAssigned?: ServiceCallback;
}

export function TaskList({ elements, onTaskDone, onItemEdited, onTaskAssigned }: TaskListElementsProps) {
    const { user: connectedUser } = useConnectedUser();

    const filteredElements: Array<Task | string> = [
        ...elements.filter(e => !e.done),
        'DIVIDER',
        ...elements.filter(e => e.done)
    ]

    const maxHeight = connectedUser?.isAdmin === true ? 'max-h-2/4-screen' : 'max-h-3/4-screen';

    return (
        <List component="ul" className={`w-full sm:w-10/12 md:w-8/12 overflow-y-auto overflow-x-hidden ${maxHeight}`}>
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
