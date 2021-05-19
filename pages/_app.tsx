import type { AppProps } from 'next/app';
import { useRef } from 'react';
import { Provider } from 'next-auth/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

import 'styles/globals.css';
import { Layout } from 'components/common';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
