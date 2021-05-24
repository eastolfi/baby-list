import { FormEvent } from 'react';
import { AbstractControl, FieldControl, FieldGroup, FormBuilder, Validators } from 'react-reactive-form';
import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Task } from '../../pages/task-list';
import { TextInput } from '../TextInput';

interface AddTaskProps {
    onItemAdd: (item: Omit<Task, 'id'>) => Promise<void>;
}
interface FormModel {
    title: string;
    assigned?: string;
}

export function AddTask({ onItemAdd }: AddTaskProps) {
    const form = FormBuilder.group({
        title: ['', Validators.required],
        assigned: ['']
    });

    // const { user } = useUser();

    const addTask = ({ title, assigned }: FormModel) => {
        const newTask: Omit<Task, 'id'> = {
            title,
            assigned
        };

        // if (user) {
        //     newTask.user = user;
        // }

        // Use callback ?
        onItemAdd(newTask).then(() => form.reset());
    }

    const handleSubmit = (e: FormEvent, value: FormModel) => {
        e.preventDefault();
        addTask(value);
    }

    return (
        <FieldGroup
            control={form}
            render={( { value, invalid }: AbstractControl ) => (
                <form className="flex flex-row flex-wrap mx-auto w-full sm:w-5/12" onSubmit={e => handleSubmit(e, value)} >
                    <div className="w-8/12 mb-5">
                        <FieldControl name="title" render={TextInput} meta={{ label: "Título" }} />
                    </div>
                    
                    
                    <div className="w-4/12 mb-5">
                        <IconButton disabled={invalid} aria-label="add task" color="primary" onClick={() => addTask(value)}>
                            <AddCircleTwoToneIcon fontSize="large" />
                        </IconButton>
                    </div>

                    <div className="w-full mb-5">
                        <FieldControl name="assigned" render={TextInput} meta={{
                            label: "Asignado a",
                            inputProps: {
                                startAdornment: <InputAdornment position="start">@</InputAdornment>
                            }
                        }} />
                    </div>
                </form>
            )} />
    )
}
