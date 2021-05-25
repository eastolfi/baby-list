import Head from 'next/head';
import { ReactNode } from 'react';
import styled from '@emotion/styled';

// import ChildFriendlyTwoToneIcon from '@material-ui/icons/ChildFriendlyTwoTone';

import Navigation from './Navigation';

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

            <main>
                <MainContainer>
                    { children }
                </MainContainer>
            </main>

            <Navigation />
        </>
    )
}
