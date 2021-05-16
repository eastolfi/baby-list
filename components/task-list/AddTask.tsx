import { KeyboardEvent } from 'react';
import { FieldControl, FieldGroup, FormBuilder, Validators } from 'react-reactive-form';
import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import { Task } from '../../pages/task-list';
import { TextInput } from '../TextInput';

interface AddTaskProps {
    onItemAdd: (item: Task) => void;
}

export function AddTask({ onItemAdd }: AddTaskProps) {
    const form = FormBuilder.group({
        title: ['', Validators.required]
    });

    const addTask = () => {
        onItemAdd({
            id: (new Date()).toString(),
            title: form.get('title').value,
            done: false
        });
    }

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (form.valid && e.keyCode === 13) {
            e.preventDefault();
            
            addTask();
            form.reset();
        }
    }

    return (
        <FieldGroup
            control={form}
            render={() => (
                <div className="w-full">
                    <form className="flex flex-row mx-auto w-5/12" onSubmit={e => e.preventDefault()} >
                        <FieldControl name="title" render={TextInput} meta={{ label: "Title", onKeyUp: handleKeyUp }} />
                        <IconButton aria-label="add task" color="primary" onClick={() => addTask()}>
                            <AddCircleTwoToneIcon fontSize="large" />
                        </IconButton>
                    </form>
                </div>
            )}>
            
        </FieldGroup>
    )
}
