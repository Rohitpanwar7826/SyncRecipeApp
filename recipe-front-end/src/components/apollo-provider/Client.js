import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import store from '../store';

const httpLink = createUploadLink({
  uri: "http://127.0.0.1:3000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = store.getState().user.id;
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
