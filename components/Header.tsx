import AppBar from '@material-ui/core/AppBar';
// import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import SearchIcon from '@material-ui/icons/Search';

import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { ChangeEvent } from 'react';
import { useLocale } from '../lib/context';
import { Languages } from '../lib/i18n/languages';

type TwoLabelSwitchProps = { checked: boolean, valueRight: string, valueLeft: string, className?: string, onChange?: (value: string) => void };
function TwoLabelSwitch({ checked, valueLeft = 'On', valueRight = 'Off', className, onChange }: TwoLabelSwitchProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.checked ? valueRight : valueLeft);
    };

    return (
        <Grid className={`${className}`} component="label" container alignItems="center" spacing={1}>
            <Grid item>{ valueLeft }</Grid>
            <Grid item>
                <Switch checked={checked} onChange={handleChange} name="checkedC" />
            </Grid>
            <Grid item>{ valueRight }</Grid>
        </Grid>
    )
}

export default function Header() {
    const { lang, changeLang } = useLocale();
    
    const handleLangSwitchChange = (value: string) => {
        changeLang(Languages.findByLabel(value));
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className="flex-grow hidden sm:block">Baby List</Typography>

                <div className="flex content-around relative ml-0 w-full sm:ml-1 sm:w-auto">
                    <TwoLabelSwitch className="mr-1"
                        checked={ lang.label === Languages.FR.label }
                        valueLeft={ Languages.ES.label }
                        valueRight={ Languages.FR.label }
                        onChange={handleLangSwitchChange} />

                    {/* <div className="bg-white bg-opacity-20">
                        <div className="absolute flex items-center justify-center h-full px-3 pointer-events-none"><SearchIcon /></div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: "color-inherit transition-all",
                                input: "w-full sm:w-24 sm:focus:w-full pl-12",
                            }}
                            inputProps={{ 'aria-label': 'search' }} />
                        
                    </div> */}
                </div>
            </Toolbar>
        </AppBar>
    );
}
