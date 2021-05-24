import Head from 'next/head';
import { ReactNode } from 'react';
import styled from '@emotion/styled';

import Header from './Header';

const MainContainer = styled.div`
    max-width: 65rem;
    margin: 1.5rem auto;
    padding-left: 1rem;
    padding-right: 1rem;
`;

interface LayoutProps {
    children: ReactNode | ReactNode[];
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>Baby List</title>
            </Head>
            <Header />

            <main>
                <MainContainer>
                    { children }
                </MainContainer>
            </main>
        </>
    )
}
