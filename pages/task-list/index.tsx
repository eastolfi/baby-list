import { useEffect, useState } from 'react';

import Divider from '@material-ui/core/Divider';

import Layout from '../../components/Layout';
import { AddTask } from '../../components/task-list/AddTask';
import { TaskList } from '../../components/task-list/TaskList';
import { CallbackData, Task } from '../../models';
import useTaskService from '../../lib/services/task.service';
import { useLoading } from '../../lib/context/app.context';
import { useConnectedUser } from '../../lib/context/app.context';

export default function TaskListPage() {
    const [ items, setItems ] = useState([] as Task[]);
    const taskService = useTaskService();
    const { showLoading, hideLoading } = useLoading();
    const { connectedUser } = useConnectedUser();

    const searchTasks = () => {
        showLoading();

        taskService.searchTasks()
        .then((tasks: Task[]) => {
            setItems(tasks);
            hideLoading();
        }).catch(error => {
            console.error(error);
            hideLoading();
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

    const canAddTask = connectedUser?.isAdmin === true;

    return (
        <Layout>
            <div className="flex flex-col items-center">
                {canAddTask && <AddTask onItemAdd={ refreshTasksIfSuccess } />}

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
