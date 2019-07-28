/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Button from './AuthButton';
// $FlowFixMe
import Logo from '../../res/instagram-logo.png';
import {Mutation} from 'react-apollo';
import TextInput from './AuthTextInput';
import {gql} from 'apollo-boost';
import {useNavigation} from 'react-navigation-hooks';
import {useMutation, useApolloClient} from '@apollo/react-hooks';

type Props = {||};

const mutation = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    user_login(username: $username, password: $password) {
      id
      username
      authToken
    }
  }
`;

function LoginScreen(_: Props): React.Node {
  const {navigate} = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [commitLoginMutation, {data, error, loading}] = useMutation(mutation, {
    variables: {username, password},
  });
  const client = useApolloClient();

  useEffect(() => {
    if (data != null) {
      client.clearStore();
      async function saveAuthToken() {
        client.clearStore();
        await AsyncStorage.setItem('AUTH_TOKEN', data?.user_login?.authToken);
        navigate('App');
      }
      saveAuthToken();
    }
  }, [data]);

  useEffect(() => {
    if (error != null) {
      alert(error);
    }
  }, [error]);

  const onLoginPress = (): void => {
    if (username.length < 5) {
      alert('Username must be at least 5 characters long.');
      return;
    }

    if (password.length < 5) {
      alert('Password must be at least 5 characters long.');
      return;
    }

    commitLoginMutation();
  };

  return (
    <>
      <View style={styles.root}>
        <Image style={styles.logo} source={Logo} />
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput placeholder="Username" onChangeText={setUsername} />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <Button text="Log In" onPress={onLoginPress} loading={loading} />
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerLabel}>
          Don't have an account?{' '}
          <Text onPress={() => navigate('SignUp')} style={styles.bold}>
            Sign up.
          </Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 190,
    height: 70,
    marginBottom: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    marginHorizontal: 25,
  },
  inputContainer: {
    width: Dimensions.get('window').width,
  },
  footerContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#dce0e6',
  },
  footerLabel: {
    fontSize: 13,
    color: '#a1a1a1',
    marginVertical: 16,
  },
  bold: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default React.memo<Props>(LoginScreen);
