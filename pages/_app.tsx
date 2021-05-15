import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import { fetcher } from '../lib/fetchJson';

import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
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
                <Component {...pageProps} />
            </SWRConfig>
        </>
    )
}