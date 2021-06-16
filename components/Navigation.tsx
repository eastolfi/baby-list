import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { useTranslation } from 'react-i18next';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import LoopTwoToneIcon from '@material-ui/icons/LoopTwoTone';

interface NavigationProps {
}

export default function Navigation(_props: NavigationProps) {
    const { t } = useTranslation();
    const router = useRouter();
    const { user, isLoading } = useUser();
    
    const [value, setValue] = useState('/');
    const handleChange = (_event: ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        router.push(newValue);
    };

    useEffect(() => {
        setValue(window.location.pathname);
    }, []);

    const navigationClasses = 'fixed bottom-0 w-full shadow-top';

    if (isLoading) {
        // Change to loading layout
        return (
            <BottomNavigation className={navigationClasses}>
                <BottomNavigationAction label={t('global.common.loading')} value="" icon={<LoopTwoToneIcon />} />
            </BottomNavigation>
        )
    }

    if (!user) {
        return (
            <BottomNavigation showLabels value={value} onChange={handleChange} className={navigationClasses}>
                <BottomNavigationAction label={t('global.routing.home')} value="/" icon={<HomeTwoToneIcon />} />
                <BottomNavigationAction label={t('global.routing.tasks')} value="/task-list" icon={<AssignmentTwoToneIcon />} />
                <BottomNavigationAction label={t('global.routing.sign-in')} value="/api/auth/login" icon={<PersonAddTwoToneIcon />} />
            </BottomNavigation>
        )
    }

    return (
        <BottomNavigation value={value} showLabels={true} onChange={handleChange} className={navigationClasses}>
            <BottomNavigationAction label={t('global.routing.home')} value="/" icon={<HomeTwoToneIcon />} />
            <BottomNavigationAction label={t('global.routing.tasks')} value="/task-list" icon={<AssignmentTwoToneIcon />} />
            <BottomNavigationAction label={t('global.routing.sign-out')} value="/api/auth/logout" icon={<MeetingRoomTwoToneIcon />} />
        </BottomNavigation>
    )
}
