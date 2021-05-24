import { Task } from '../../pages/task-list';

interface DisplayTaskProps {
    item: Task;
}

export function DisplayTask({ item }: DisplayTaskProps) {
    const completionClass = item.done ? 'line-through' : '';

    return (
        <div className={ `flex flex-col ${!item.available ? 'italic opacity-60' : ''}` } >
            <span className={completionClass}>{ item.title }</span>
            {item.assigned && <span className="italic ml-3">{ item.assigned }</span>}
        </div>
    )
}
