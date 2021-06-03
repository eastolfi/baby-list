import { useUser } from '@auth0/nextjs-auth0';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout'

export default function Home() {
    const { user } = useUser();
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="text-center">

                {user && (
                    <Typography variant="h4" component="h1" gutterBottom>
                        {t('home.greeting.connected')}
                    </Typography>
                )}

                {!user && (
                    <Typography variant="h4" component="h1" gutterBottom>
                        {t('home.greeting.not-connected')}
                    </Typography>
                )}
            </div>
        </Layout>
    )
}
