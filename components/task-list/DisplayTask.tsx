import ListItemText from '@material-ui/core/ListItemText';

import { Task } from '../../pages/task-list';

interface DisplayTaskProps {
    item: Task;
}

export function DisplayTask({ item }: DisplayTaskProps) {
    return (
        <ListItemText
            className={ `flex flex-col ${item.done ? 'line-through' : ''}` }
            primary={ item.title }
            secondary={ item.assigned ? item.assigned : null }
         />
    )
}
