import { useEffect } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { SWRConfig } from 'swr';
import { UserProvider } from '@auth0/nextjs-auth0';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { fetcher } from '../lib/fetchJson';
import { createAppTheme } from '../lib/theme';

import { AppProvider, useLocale } from '../lib/context/app.context';
import '../lib/i18n/i18n';

import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    const { lang } = useLocale();

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
                <AppProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={createAppTheme(lang.code)}>
                            <CssBaseline />

                            <Component {...pageProps} />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                </AppProvider>
            </SWRConfig>
        </UserProvider>
    )
}
