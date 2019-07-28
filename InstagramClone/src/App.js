/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import LoginScreen from './auth/LoginScreen';
import SignUpScreen from './auth/SignUpScreen';
import FeedScreen from './feed/FeedScreen';
import LoadingScreen from './auth/AuthLoadingScreen';

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppStack = createStackNavigator({
  Feed: {
    screen: FeedScreen,
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: LoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

const client = new ApolloClient({
  uri: 'http://10.0.0.130:4000/graphql',
  headers: {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzgwMDgxNDBlNjgxYThjNDgzMTMyNyIsImlhdCI6MTU2Mzk1MTI4NSwiZXhwIjoxNTY2NTQzMjg1LCJhdWQiOiJienQwS0tBd21xOVhmRWJGOFMzN2RWdG9uaVRZNWw5WSIsImlzcyI6Ikluc3RhZ3JhbUNsb25lU2VydmVyIiwic3ViIjoiY2JhcnJhemFhMSJ9.P-qIV5TpXTWL93Xz2bK7OpzAyRxB6XqIHC7ifdAp3sM',
  },
});

export function App(props): React.Node {
  return (
    <ApolloProvider client={client}>
      <AppContainer {...props} />
    </ApolloProvider>
  );
}
