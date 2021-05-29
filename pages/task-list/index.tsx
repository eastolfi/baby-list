import { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Divider from '@material-ui/core/Divider';

import Layout from '../../components/Layout';
import { AddTask } from '../../components/task-list/AddTask';
import { TaskList } from '../../components/task-list/TaskList';
import { CallbackData, Task } from '../../models';
import useTaskService from '../../lib/services/task.service';

export const getServerSideProps = withPageAuthRequired();

export default function TaskListPage() {
    const [ items, setItems ] = useState([] as Task[]);
    const taskService = useTaskService();

    const searchTasks = () => {
        taskService.searchTasks()
        .then((tasks: Task[]) => {
            setItems(tasks);
        }).catch(error => {
            console.error(error);
        });
    }
    
    useEffect(() => {
        searchTasks();
    }, []);

    const refreshTasksIfSuccess = (error: Error | null, data?: CallbackData) => {
        if (!error) {
            if (data?.assigned) {
                console.log(`Task assigned to ${data.assigned}`);
            }

            searchTasks();
        } else {
            alert(`An error occured - ${error?.message || error || 'Contact support'}`);
        }
    }

    const handleTaskAdded = (task: Omit<Task, 'id'>): Promise<void> => {
        return new Promise((resolve, reject) => {
            return taskService.addTask(task)
            .then(() => {
                searchTasks();
                resolve();
            }).catch(error => {
                console.error(error);
                reject(error);
            });
        })
    };

    return (
        <Layout>
            <div className="flex flex-col items-center">
                <div className="">
                    <AddTask onItemAdd={ handleTaskAdded } />
                </div>

                <Divider className="w-full" variant="middle" />

                <TaskList
                    elements={items}
                    onTaskDone={refreshTasksIfSuccess}
                    onItemEdited={refreshTasksIfSuccess}
                    onTaskAssigned={refreshTasksIfSuccess}
                ></TaskList>
            </div>
        </Layout>
    )
}
