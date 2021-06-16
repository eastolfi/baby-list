import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

import { AppDialog, RenderFunctionParams } from './AppDialog';

type ConfirmModalProps = {
    open: boolean;
    title: string;
    body: string;
    onClose: (result?: boolean) => void;
}

export function ConfirmModal({ open, title, body, onClose }: ConfirmModalProps) {
    const { t } = useTranslation();

    
    const close = (closeDialog: (result?: boolean) => void) => {
        closeDialog(false);
    }

    const confirm = (closeDialog: (result?: boolean) => void) => {
        closeDialog(true);
    }

    const handleDialogClosed = (result?: boolean) => {
        onClose(result);
    }

    return (
        <AppDialog
            open={open}
            title={title}
            onClose={handleDialogClosed}
            render={({ closeDialog }: RenderFunctionParams<boolean>) => (
            <>
                <DialogContent>
                    <div className='w-full'>
                        <Typography variant='body1'>{ body }</Typography>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => close(closeDialog)} color='secondary'>
                        { t('global.buttons.cancel') }
                    </Button>
                    <Button onClick={() => confirm(closeDialog)} color='primary'>
                        { t('global.buttons.confirm') }
                    </Button>
                </DialogActions>
            </>
        )} />
    )
}
