import { ApolloClient } from 'apollo-client';
import {
    InMemoryCache,
    IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

import introspectionQueryResultData from './fragmentTypes';
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
});

const cache = new InMemoryCache({
    fragmentMatcher,
    cacheRedirects: {
        Query: {
            user: (_, args, { getCacheKey }) =>{
                return getCacheKey({ __typename: 'User', id: args.id });
            }
        }
    }
});
export default new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        withClientState({
            defaults: {
                menuOpen: true
            },
            resolvers: {
                Mutation: {
                    updateMenuOpen: (_, { menuOpen }, { cache }) => {
                        cache.writeData({ data: { menuOpen }});
                        return null;
                    }
                }
            },
            cache
        }),
        new HttpLink({
            uri: 'http://localhost:3003/',
            credentials: 'same-origin'
        })
    ]),
    cache
});
