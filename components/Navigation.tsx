import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import LoopTwoToneIcon from '@material-ui/icons/LoopTwoTone';

interface NavigationProps {
}

export default function Navigation(_props: NavigationProps) {
    const router = useRouter();
    const { user, isLoading } = useUser();
    
    const [value, setValue] = useState('/');
    const handleChange = (_event: ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        router.push(newValue);
    };

    const navigationClasses = 'fixed bottom-0 w-full shadow-top';

    if (isLoading) {
        // Change to loading layout
        return (
            <BottomNavigation className={navigationClasses}>
                <BottomNavigationAction label="Cargando..." value="/" icon={<LoopTwoToneIcon />} />
            </BottomNavigation>
        )
    }

    if (!user) {
        return (
            <BottomNavigation showLabels value={value} onChange={handleChange} className={navigationClasses}>
                <BottomNavigationAction label="Conectarse" value="/api/auth/login" icon={<AccountCircleTwoToneIcon />} />
            </BottomNavigation>
        )
    }

    return (
        <BottomNavigation value={value} onChange={handleChange} className={navigationClasses}>
            <BottomNavigationAction label="Inicio" value="/" icon={<HomeTwoToneIcon />} />
            <BottomNavigationAction label="Tareas" value="/task-list" icon={<AssignmentTwoToneIcon />} />
            <BottomNavigationAction label="Cuenta" value="/profile" icon={<PersonAddTwoToneIcon />} />
            <BottomNavigationAction label="Desconectarse" value="/api/auth/logout" icon={<MeetingRoomTwoToneIcon />} />
        </BottomNavigation>
    )
}
