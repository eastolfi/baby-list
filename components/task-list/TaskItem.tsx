import { useUser } from '@auth0/nextjs-auth0';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import useTaskService from '../../lib/services/task.service';
import { ServiceCallback, Task } from '../../models';
import { useLoading } from '../../lib/context/app.context';

import { AssignTask } from './AssignTask';
import { DisplayTask } from './DisplayTask';
import { EditTask } from './EditTask';

interface TaskItemProps {
    task: Task;
    onTaskDone?: ServiceCallback;
    onItemEdited?: ServiceCallback;
    onTaskAssigned?: ServiceCallback;
}

export function TaskItem({ task, onTaskDone, onItemEdited, onTaskAssigned }: TaskItemProps) {
    const { t } = useTranslation();
    const taskService = useTaskService();
    const { showLoading, hideLoading } = useLoading();

    const handleToggleTaskDone = () => {
        showLoading();

        taskService.toggleTaskDone(task.id)
        .then(() => {
            hideLoading();
            onTaskDone && onTaskDone(null);
        }).catch(error => {
            hideLoading();
            console.error(error);
            onTaskDone && onTaskDone(error);
        });
    };

    const TaskDoneButton = () => {
        if (task.done) {
            return (
                <IconButton aria-label={t('tasks.actions.uncomplete')} color="secondary" onClick={handleToggleTaskDone}>
                    <ClearIcon />
                </IconButton>
            )
        } else {
            return (
                <IconButton aria-label={t('tasks.actions.complete')} color="primary" onClick={handleToggleTaskDone}>
                    <DoneIcon />
                </IconButton>
            )
        }
    }

    const { user } = useUser();
    // Change to context
    const canToggleDone = user?.isAdmin === true;
    const canModify = (!task.done && task.createdBy && user) ? task.createdBy?.email === user?.email : false;
    const canAssign = canModify || task.available;

    return (
        <ListItem>
            {canToggleDone && (
            <ListItemAvatar>
                <TaskDoneButton />
            </ListItemAvatar>)}
            
            <DisplayTask item={task} />

            {task.link && 
            <a aria-label={t('tasks.actions.open')} color="secondary" href={task.link} target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon />
            </a>}

            {canAssign && <AssignTask task={task} onTaskAssigned={onTaskAssigned} />}

            {canModify && <EditTask className="ml-auto" item={task} onItemEdited={onItemEdited} />}
        </ListItem>
    )
}
