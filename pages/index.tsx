import { useUser } from '@auth0/nextjs-auth0';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

import Layout from '../components/Layout'

export default function Home() {
    const { user } = useUser();
    // const router = useRouter();

    return (
        <Layout>
            <div className="text-center">

                {user && (
                    <h1>Bienvenid@</h1>
                )}

                {!user && (
                    <>
                        <h1>Necesitas estar conectado para acceder</h1>
                        <p>
                            <Link href="/api/auth/login">
                                <Button>Login</Button>
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </Layout>
    )
}
