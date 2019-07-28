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
import {ApolloProvider} from 'react-apollo';
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
const client = new ApolloClient({uri: 'http://10.0.0.130:4000/graphql'});
export function App(): React.Node {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}
