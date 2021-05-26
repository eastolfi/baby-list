import Head from 'next/head';
import { ReactNode } from 'react';

// import ChildFriendlyTwoToneIcon from '@material-ui/icons/ChildFriendlyTwoTone';

import Navigation from './Navigation';
import Header from './Header';

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
                <div className="mx-auto my-5 px-5">
                    { children }
                </div>
            </main>

            <Navigation />
        </>
    )
}
