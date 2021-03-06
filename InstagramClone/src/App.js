/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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

export function App(): React.Node {
  const [client, setClient] = useState(null);
  useEffect(() => {
    async function createApolloClient() {
      const authToken = await AsyncStorage.getItem('AUTH_TOKEN');
      setClient(
        new ApolloClient({
          uri: 'http://10.0.0.130:4000/graphql',
          headers: {authorization: authToken ?? ''},
        })
      );
    }
    createApolloClient();
  }, [client]);

  return (
    client != null && (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    )
  );
}
