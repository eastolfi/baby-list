import { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '../../components/Layout';
import { AddTask } from '../../components/task-list/AddTask';
import { TaskList } from '../../components/task-list/TaskList';
import { fetcher } from '../../lib/fetchJson';

export interface User {
    email: string;
    isAdmin: boolean;
}
export interface Task {
    id: string;
    title: string;
    done?: boolean;
    available?: boolean;
    assigned?: string;
    createdBy?: User;
}

export const getServerSideProps = withPageAuthRequired();

export default function TaskListPage() {
    const [ items, setItems ] = useState([] as Task[]);

    const searchTasks = () => {
        fetcher('/api/tasks/search', { method: 'POST' })
        .then(({ tasks }: { tasks: Task[] }) => {
            setItems(tasks);
        }).catch(error => {
            console.error(error);
        });
    }
    
    useEffect(() => {
        searchTasks();
    }, []);

    const handleMarkTaskDone = (taskId: string) => {
        fetcher('/api/tasks/done', { method: 'POST', body: JSON.stringify({ taskId }) })
        .then(() => {
            searchTasks();
        }).catch(error => {
            console.error(error);
        });
    }

    const handleTaskAssigned = (done: boolean, assigned?: string, error?: Error) => {
        if (done) {
            console.log(`Task assigned to ${assigned}`);
            searchTasks();
        } else {
            alert(`An error occured - ${error?.message || error || 'Contact support'}`);
        }
    }

    const handleTaskAdded = (task: Omit<Task, 'id'>): Promise<void> => {
        return new Promise((resolve, reject) => {
            return fetcher('/api/tasks/add', { method: 'POST', body: JSON.stringify({ task }) })
            .then(() => {
                searchTasks();
                resolve();
            }).catch(error => {
                console.error(error);
                reject(error);
            });
        })
    };

    const handleTaskEdited = (task: Task) => {
        fetcher('/api/tasks/edit', { method: 'POST', body: JSON.stringify({ task }) })
        .then(() => {
            searchTasks();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <Layout>
            <div className="flex flex-col items-center">
                <AddTask onItemAdd={ handleTaskAdded } />

                <TaskList
                    elements={items}
                    onTaskDone={handleMarkTaskDone}
                    onItemEdited={handleTaskEdited}
                    onTaskAssigned={handleTaskAssigned}
                ></TaskList>
            </div>
        </Layout>
    )
}
