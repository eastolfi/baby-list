import { useState } from 'react';

import Layout from '../../components/Layout';
import { AddTask } from '../../components/task-list/AddTask';
import { TaskList } from '../../components/task-list/TaskList';

export interface Task {
    id: string;
    title: string;
    done: boolean;
}

export default function TaskListPage() {
    const [ items, setItems ] = useState([{ id: '1', title: 'initial', done: false }] as Task[]);

    const handleMarkTaskDone = (taskId: string) => {
        setItems((prev: Task[]) => {
            return prev.map((task: Task) => {
                if (task.id === taskId) {
                    task.done = !task.done;
                }
                return task;
            });
        });
    }

    return (
        <Layout>
            <div className="flex flex-col items-center">
                <AddTask onItemAdd={ (item: Task) => setItems((prev: Task[]) => [...prev, item]) } />

                <TaskList
                    elements={items}
                    onTaskDone={handleMarkTaskDone}
                ></TaskList>
            </div>
            
        </Layout>
    )
}
