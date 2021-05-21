import { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import { AddTask } from '../../components/task-list/AddTask';
import { TaskList } from '../../components/task-list/TaskList';
import { fetcher } from '../../lib/fetchJson';

export interface Task {
    id: string;
    title: string;
    done: boolean;
}

export default function TaskListPage() {
    const [ items, setItems ] = useState([] as Task[]);
    
    useEffect(() => {
        fetcher('/api/tasks/search', { method: 'POST' })
        .then(({ tasks }: { tasks: Task[] }) => {
            setItems(tasks);
        }).catch(error => {
            console.error(error);
        });
    }, []);

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

    const handleTaskAdded = (task: Task) => {
        const b = JSON.stringify({ task })
        console.log(b)
        fetcher('/api/tasks/add', { method: 'POST', body: b })
        .then(({ taskAdded }: { taskAdded: Task }) => {
            setItems((prev: Task[]) => [...prev, taskAdded])
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <Layout>
            <div className="flex flex-col items-center">
                <AddTask onItemAdd={ handleTaskAdded } />

                <TaskList
                    elements={items}
                    onTaskDone={handleMarkTaskDone}
                ></TaskList>
            </div>
            
        </Layout>
    )
}
