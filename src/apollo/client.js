import fetch from 'cross-fetch'
import { ApolloClient, InMemoryCache,HttpLink } from '@apollo/client';

export const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://qvvn2zxvvjbcdce6t2lebzxvve.appsync-api.eu-west-1.amazonaws.com/graphql',
       fetch, 
       headers: {
        "x-api-key": "da2-mcqfwj6pqffntfbwvglwdvidhm", // ENTER YOUR API KEY HERE
      },
    }),
    cache: new InMemoryCache()
})