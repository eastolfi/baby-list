import { ServerStyleSheets } from '@material-ui/core/styles';
import { AppPropsType, AppType } from 'next/dist/next-server/lib/utils';
import Document, { Html, Main, NextScript, DocumentContext, Head } from 'next/document';
import { Children, PropsWithChildren } from 'react';

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheets = new ServerStyleSheets();

        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () => originalRenderPage({
            enhanceApp: (App: AppType) => (props: PropsWithChildren<AppPropsType>) => sheets.collect(<App {...props} />),
        });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [ ...Children.toArray(initialProps.styles), sheets.getStyleElement() ]
        }
    }

    public render(): JSX.Element {
        return (
            <Html>
                <Head />
                
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
