import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export function Loading({ open }: { open: boolean }) {
    return (
        <Backdrop className="z-10" open={open}>
            <CircularProgress color="primary" />
        </Backdrop>
    )
}
