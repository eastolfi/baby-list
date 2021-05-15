import styled from '@emotion/styled';
import { SyntheticEvent, useState } from 'react';
import Form from '../components/login/LoginForm';

import Layout from "../components/Layout";
import { fetcher } from '../lib/fetchJson';
import { useUser } from '../lib/useUser';

const LoginContainer = styled.div`
    max-width: 21rem;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export default function Login() {
    const { mutateUser } = useUser({ redirectTo: '/profile', redirectIfFound: true });
    const [ errorMsg, setErrorMsg ] = useState('');

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = { username: e.currentTarget.username.value };

        try {
            await mutateUser(fetcher('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }));
        } catch (error) {
            console.error('An unexpected error happened:', error);
            setErrorMsg(error.data.message);
        }
    };
    return (
        <Layout>
            <LoginContainer>
                <Form errorMessage={errorMsg} onSubmit={handleSubmit}></Form>
            </LoginContainer>
        </Layout>
    )
}