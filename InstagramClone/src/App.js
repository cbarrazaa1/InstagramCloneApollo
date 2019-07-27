/**
 * @format
 * @flow strict
 */

import AuthScreen from './auth/AuthScreen';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import * as React from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';

const AppNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);
const client = new ApolloClient({uri: 'http://10.0.0.130:4000/graphql'});
export function App(): React.Node {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}
