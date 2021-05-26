import { FormEvent } from 'react';
import { AbstractControl, FieldControl, FieldGroup, FormBuilder, Validators } from 'react-reactive-form';
import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Task } from '../../pages/task-list';
import { TextInput } from '../TextInput';

interface AddTaskProps {
    item?: Task;
    onItemAdd?: (item: Omit<Task, 'id'>) => Promise<void>;
    onItemEdit?: (item: Task) => void;
}
interface FormModel {
    title: string;
    assigned?: string;
}

export function AddTask({ item, onItemAdd, onItemEdit }: AddTaskProps) {
    const form = FormBuilder.group({
        title: ['', Validators.required],
        assigned: ['']
    });

    if (item) {
        form.setValue({
            title: item.title,
            assigned: item.assigned || ''
        })
    }

    const addOrEditTask = ({ title, assigned }: FormModel) => {
        const newTask: Omit<Task, 'id'> = {
            title,
            assigned
        };

        // Use callback ?
        if (onItemAdd) {
            onItemAdd(newTask).then(() => form.reset());
        }

        if (onItemEdit) {
            onItemEdit({
                ...item,
                title,
                assigned
            } as Task);
        }
    }

    const handleSubmit = (e: FormEvent, value: FormModel) => {
        e.preventDefault();
        addOrEditTask(value);
    }

    return (
        <FieldGroup
            control={form}
            render={( { value, invalid }: AbstractControl ) => (
                <form className="flex flex-row flex-wrap mx-auto w-full sm:w-10/12 md:w-8/12" onSubmit={e => handleSubmit(e, value)} >
                    <div className="w-8/12 mb-5">
                        <FieldControl name="title" render={TextInput} meta={{ label: "Título" }} />
                    </div>
                    
                    
                    <div className="w-4/12 mb-5">
                        <IconButton disabled={invalid} aria-label="add task" color="primary" onClick={() => addOrEditTask(value)}>
                            {item ? <CheckCircleTwoToneIcon fontSize="large" /> : <AddCircleTwoToneIcon fontSize="large" />}
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
