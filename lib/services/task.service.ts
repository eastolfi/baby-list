import { Task } from '../../models';
import { fetcher } from '../fetchJson';

export class TaskService {
    public searchTasks(): Promise<Task[]> {
        return fetcher('/api/tasks/search', { method: 'POST' })
            .then(({ tasks }: { tasks: Task[] }) => tasks);
    }

    public toggleTaskDone(taskId: string): Promise<void> {
        return fetcher('/api/tasks/done', { method: 'POST', body: JSON.stringify({ taskId }) });
    }

    public addTask(task: Omit<Task, 'id'>): Promise<void> {
        return fetcher('/api/tasks/add', { method: 'POST', body: JSON.stringify({ task }) });
    }

    public editTask(task: Task): Promise<void> {
        return fetcher('/api/tasks/edit', { method: 'POST', body: JSON.stringify({ task }) });
    }

    public assignTask(task: Task): Promise<string> {
        return fetcher('/api/tasks/assign', { method: 'POST', body: JSON.stringify({ taskId: task.id }) })
            .then(({ assigned }: { assigned: string }) => assigned);
    }
}

let instance: TaskService | null = null;
export default function useTaskService() {
    if (instance === null) {
        instance = new TaskService();
    }

    return instance;
}
