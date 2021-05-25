import { useUser } from '@auth0/nextjs-auth0';

import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout'

export default function Home() {
    const { user } = useUser();

    return (
        <Layout>
            <div className="text-center">

                {user && (
                    <Typography variant="h4" component="h1" gutterBottom>
                        Utilize la barra de navegación infererior para acceder a las distintas funcionalidades
                    </Typography>
                )}

                {!user && (
                    <Typography variant="h4" component="h1" gutterBottom>
                        Por favor, inicie sesión para acceder a las funcionalidades
                    </Typography>
                )}
            </div>
        </Layout>
    )
}
