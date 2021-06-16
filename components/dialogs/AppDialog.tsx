import { ReactNode } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export type AppDialogProps<T> = {
    open: boolean;
    title: string;
    onClose: (result?: T) => void;
    render: (params: RenderFunctionParams<T>) => ReactNode
}
export type RenderFunctionParams<T> = {
    closeDialog: (result?: T) => void;
};

export function AppDialog<T>({ open, title, onClose, render }: AppDialogProps<T>) {
    const handleClose = (value?: T) => {
        onClose(value);
    }

    return (
        <Dialog onClose={() => handleClose()} aria-labelledby={title} open={open}>
            <DialogTitle>{title}</DialogTitle>

            { render({ closeDialog: handleClose }) }
        </Dialog>
    )
}
