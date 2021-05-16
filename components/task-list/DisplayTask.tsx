import { Task } from '../../pages/task-list';

interface DisplayTaskProps {
    item: Task;
}

export function DisplayTask({ item }: DisplayTaskProps) {
    return (
        <div style={{textDecoration: item.done ? 'line-through' : 'inherit'}}>{ item.title }</div>
    )
}
