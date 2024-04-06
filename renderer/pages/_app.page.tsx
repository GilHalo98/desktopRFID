import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import RootLayout from '../components/Layout/rootLayout';

function MyApp({ Component, pageProps }: AppProps) {
    const PaginaConLayout = Component['getLayout'] || function (page) {
        return (
            <RootLayout>
                {page}
            </RootLayout>
        );
    };
    return PaginaConLayout(<Component {...pageProps} />);
};

export default MyApp;