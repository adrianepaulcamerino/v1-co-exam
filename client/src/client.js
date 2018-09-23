import ApolloClient from 'apollo-boost';

const token = localStorage.getItem('token');

const client = new ApolloClient({
  uri: process.env.APP_GRAPHQL_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default client;
