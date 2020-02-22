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
    }
});
