import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { AppDialog, RenderFunctionParams } from './AppDialog';
import { ChangeEvent, useState } from 'react';

type PromptModalProps = {
    open: boolean;
    title: string;
    label: string;
    initialState: string;
    message?: string;
    onClose: (result?: string) => void;
}

export function PromptModal({ open, title, label, initialState, message, onClose }: PromptModalProps) {
    const { t } = useTranslation();
    const [ value, setValue ] = useState('');

    const isValid = value?.trim().length > 0;
    
    const close = (closeDialog: (result?: string) => void) => {
        closeDialog();
    }

    const confirm = (closeDialog: (result?: string) => void) => {
        closeDialog(value.trim());
    }

    const handleDialogClosed = (result?: string) => {
        onClose(result);
    }

    return (
        <AppDialog
            open={open}
            title={title}
            onClose={handleDialogClosed}
            render={({ closeDialog }: RenderFunctionParams<string>) => (
            <>
                <DialogContent>
                    {message?.trim() &&
                    <Typography className='mb-3' variant='body2' component='p'>{ message }</Typography>}

                    <div className='w-full'>
                        <TextField
                            type='text'
                            className='w-full'
                            label={label}
                            variant='outlined'
                            required={true}
                            autoFocus
                            defaultValue={initialState}
                            onChange={({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.value)} />
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => close(closeDialog)} color='secondary'>
                        { t('global.buttons.cancel') }
                    </Button>
                    <Button onClick={() => confirm(closeDialog)} color='primary' disabled={!isValid}>
                        { t('global.buttons.confirm') }
                    </Button>
                </DialogActions>
            </>
        )} />
    )
}
