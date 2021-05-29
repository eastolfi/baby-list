import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { UserProvider } from '@auth0/nextjs-auth0';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { fetcher } from '../lib/fetchJson';
import { theme } from '../lib/theme';

import '../styles/global.scss';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <UserProvider>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <SWRConfig
                value={{
                    fetcher: fetcher,
                    onError: (error) => {
                        console.error(error);
                    }
                }}
            >
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    <Component {...pageProps} />
                </ThemeProvider>
            </SWRConfig>
        </UserProvider>
    )
}
