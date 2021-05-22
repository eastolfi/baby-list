import Layout from "../components/Layout";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
// import { useUser } from "../lib/useUser";
import { useUser } from '@auth0/nextjs-auth0';

// function githubUrl(login: string) {
//     return `https://api.github.com/users/${login}`;
// }

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired();

export default function Profile() {
    // const { user } = useUser({ redirectTo: '/login' });
    const { user, error, isLoading } = useUser();

    if (isLoading) {
        return <Layout>Loading...</Layout>
    }
  
    if (error) {
        return <Layout>{ error.message }</Layout>
    }

    return user && (
        <Layout>
            <h1>Your Github profile</h1>

            <div>
                <img src={user.picture as string} alt={user.name as string} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
            {/* <p style={{ fontStyle: 'italic' }}>
                Public data, from{' '}
                <a href={githubUrl(user.login)}>{githubUrl(user.login)}</a>, reduced to
                `login` and `avatar_url`.
            </p> */}
        </Layout>
    )
}
