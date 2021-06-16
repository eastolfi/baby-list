import { useUser } from '@auth0/nextjs-auth0';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout'

export default function Home() {
    const { user } = useUser();
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="text-center">

                <Typography variant="h5" component="h1" gutterBottom>
                    {t('home.greeting.common')}
                </Typography>

                {!user && (
                    <>
                        <Typography variant="subtitle1" component="h2" gutterBottom>
                            {t('home.greeting.not-connected')}
                        </Typography>

                        <Button variant="contained" href="/api/auth/login">{t('global.routing.sign-in')}</Button>
                    </>
                )}
            </div>
        </Layout>
    )
}
