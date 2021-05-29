import { ChangeEvent, FormEvent, useState } from 'react';
import { AbstractControl, FieldControl, FieldGroup, FormBuilder, Validators } from 'react-reactive-form';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LinkIcon from '@material-ui/icons/Link';
// import CropOriginalIcon from '@material-ui/icons/CropOriginal';
// import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { TextInput } from '../TextInput';
import { Task } from '../../models';

interface AddTaskProps {
    item?: Task;
    onItemAdd?: (item: Omit<Task, 'id'>) => Promise<void>;
    onItemEdit?: (item: Task) => void;
}
interface FormModel {
    title: string;
    // link?: string;
    // picture?: string;
    assigned?: string;
}

function PromptComponent({ open, title, label, initial, onClose }: { open: boolean, title: string, label: string, initial: string, onClose: (value?: string) => void }) {
    const [ value, setValue ] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleClose = (value?: string) => {
        onClose(value);
    }

    return (
        <Dialog open={open} onClose={() => handleClose()} maxWidth="sm" fullWidth={true}>
            <DialogTitle>{ title }</DialogTitle>

            <DialogContent>
                <div className="w-full">
                    <TextField
                        type="text"
                        className="w-full"
                        label={label}
                        variant="outlined"
                        required={true}
                        autoFocus
                        defaultValue={initial}
                        onChange={handleChange} />
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={() => handleClose(value.trim())} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export function AddTask({ item, onItemAdd, onItemEdit }: AddTaskProps) {
    const [ dialogOpen, setDialogOpen ] = useState(false);
    const [ dialogOpener, setDialogOpener ] = useState('');
    const [ dialogTitle, setDialogTitle ] = useState('');
    const [ dialogLabel, setDialogLabel ] = useState('');
    const [ link, setLink ] = useState(item?.link || '')
    const [ picture, setPicture ] = useState('')

    const form = FormBuilder.group({
        title: ['', Validators.required],
        // link: [''],
        // picture: [''],
        assigned: [''],
    });

    if (item) {
        form.setValue({
            title: item.title,
            // link: item.link,
            // picture: item.picture,
            assigned: item.assigned || '',
        });
    }

    // useEffect(() => {
    //     setPicture(item.picture);
    // }, [])

    const addOrEditTask = ({ title, assigned }: FormModel) => {
        const newTask: Omit<Task, 'id'> = {
            title,
            link,
            picture,
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
                link,
                assigned
            } as Task);
        }
    }

    const handleSubmit = (e: FormEvent, value: FormModel) => {
        e.preventDefault();
        addOrEditTask(value);
    }

    const handleAddLink = () => {
        setDialogTitle('Añadir enlace');
        setDialogLabel('Enlace');
        setDialogOpener('LINK');
        setDialogOpen(true);
    }

    // const handleAddPicture = () => {
    //     setDialogTitle('Añadir enlace de image');
    //     setDialogLabel('Enlace de la imagen');
    //     setDialogOpener('PICTURE');
    //     setDialogOpen(true);
    // }

    const resetDialogState = () => {
        setDialogTitle('');
        setDialogLabel('');
        setDialogOpener('');
    }

    const handleDialogClosed = (value?: string) => {
        if (value != null) {
            if (dialogOpener === 'LINK') {
                // Workaround, since the patchValue is not working
                setLink(value);
            } else if (dialogOpener === 'PICTURE') {
                // Workaround, since the patchValue is not working
                setPicture(value);
            }
        }

        setDialogOpen(false);
        resetDialogState();
    }

    return (
        <>
            <PromptComponent
                open={dialogOpen}
                title={dialogTitle}
                label={dialogLabel}
                initial={dialogOpener === 'LINK' ? link : picture}
                onClose={handleDialogClosed} />

            <FieldGroup
                control={form}
                strict={false}
                render={( { value, invalid }: AbstractControl ) => (
                    <form className="flex flex-row flex-wrap mx-auto w-full sm:w-10/12 md:w-8/12" onSubmit={e => handleSubmit(e, value)} >
                        <div className="w-8/12 mb-5">
                            <FieldControl name="title" render={TextInput} meta={{ label: "Título" }} />
                        </div>

                        <div className="w-4/12 mb-5 text-center">
                            <IconButton aria-label="add link" color="secondary" onClick={handleAddLink}>
                                {!link && <LinkIcon fontSize="large" />}

                                {link && (<Badge color="primary" badgeContent="🗸">
                                    <LinkIcon fontSize="large" />
                                </Badge>)}
                            </IconButton>

                            {/* <IconButton aria-label="add link" color="secondary" onClick={handleAddPicture}>
                                <CropOriginalIcon fontSize="large" />
                            </IconButton> */}
                        </div>

                        <div className="w-8/12 mb-5">
                            <FieldControl name="assigned" render={TextInput} meta={{
                                label: "Asignado a",
                                inputProps: {
                                    startAdornment: <InputAdornment position="start">@</InputAdornment>
                                }
                            }} />
                        </div>

                        <div className="w-4/12 mb-5 text-center">
                            <IconButton
                                color="primary"
                                disabled={false && invalid}
                                aria-label="add task"
                                onClick={() => addOrEditTask(value)}
                                >
                                {item ? <CheckCircleOutlineIcon fontSize="large" /> : <AddCircleOutlineIcon fontSize="large" />}
                            </IconButton>
                        </div>
                    </form>
                )} />
        </>
    )
}
