import Layout from "../components/Layout";
import { useUser } from "../lib/useUser";

function githubUrl(login: string) {
    return `https://api.github.com/users/${login}`;
}

export default function Profile() {
    const { user } = useUser({ redirectTo: '/login' });

    if (!user || user.isLoggedIn === false) {
        return <Layout>Loading...</Layout>
    }

    return (
        <Layout>
            <h1>Your Github profile</h1>

            <p style={{ fontStyle: 'italic' }}>
                Public data, from{' '}
                <a href={githubUrl(user.login)}>{githubUrl(user.login)}</a>, reduced to
                `login` and `avatar_url`.
            </p>
        </Layout>
    )
}