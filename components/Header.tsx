import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className="flex-grow hidden sm:block">Baby List</Typography>

                <div className="relative ml-0 w-full sm:ml-1 sm:w-auto rounded bg-white bg-opacity-20">
                    <div className="absolute flex items-center justify-center h-full px-3 pointer-events-none"><SearchIcon /></div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: "color-inherit transition-all",
                            input: "w-full sm:w-24 sm:focus:w-full pl-12",
                        }}
                        inputProps={{ 'aria-label': 'search' }} />
                </div>
            </Toolbar>
        </AppBar>
    );
}
