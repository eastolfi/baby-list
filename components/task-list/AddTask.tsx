import { FormEvent } from 'react';
import { AbstractControl, FieldControl, FieldGroup, FormBuilder, Validators } from 'react-reactive-form';
import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import { Task } from '../../pages/task-list';
import { TextInput } from '../TextInput';

interface AddTaskProps {
    onItemAdd: (item: Task) => void;
}
interface FormModel {
    title: string;
}

export function AddTask({ onItemAdd }: AddTaskProps) {
    const form = FormBuilder.group({
        title: ['', Validators.required]
    });

    const addTask = ({ title }: FormModel) => {
        onItemAdd({
            id: (new Date()).toString(),
            title,
            done: false
        });
    }

    const handleSubmit = (e: FormEvent, value: FormModel) => {
        e.preventDefault();
        addTask(value);
    }

    return (
        <FieldGroup
            control={form}
            render={( { value }: AbstractControl ) => (
                <div className="w-full">
                    <form className="flex flex-row mx-auto w-5/12" onSubmit={e => handleSubmit(e, value)} >
                        <FieldControl name="title" render={TextInput} meta={{ label: "Title" }} />
                        
                        <IconButton aria-label="add task" color="primary" onClick={() => addTask(value)}>
                            <AddCircleTwoToneIcon fontSize="large" />
                        </IconButton>
                    </form>
                </div>
            )} />
    )
}
