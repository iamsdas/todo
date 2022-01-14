import 'tailwindcss/tailwind.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
