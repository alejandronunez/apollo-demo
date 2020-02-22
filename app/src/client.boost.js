import ApolloClient from 'apollo-boost';

export default new ApolloClient({
    uri: 'http://localhost:3003/',
    clientState: {
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
        }
    },
    cacheRedirects: {
        Query: {
            user: (_, { id }, { getCacheKey }) =>
                getCacheKey({ __typename: 'User', id }),
        }
    }
});
