/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Button from './AuthButton';
import TextInput from './AuthTextInput';
import {useNavigation} from 'react-navigation-hooks';
import {useState} from 'react';
import {useMutation, useApolloClient} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import AsyncStorage from '@react-native-community/async-storage';

const mutation = gql`
  mutation SignUpScreenMutation(
    $username: String!
    $name: String!
    $password: String!
  ) {
    user_sign_up(username: $username, name: $name, password: $password) {
      id
      username
      authToken
    }
  }
`;

type Props = {||};

function SignUpScreen(_: Props): React.Node {
  const {navigate, goBack} = useNavigation();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [commitSignUpMutation, {data, error, loading}] = useMutation(mutation, {
    variables: {
      username,
      name,
      password,
    },
  });
  const client = useApolloClient();

  useEffect(() => {
    if (data != null) {
      async function saveAuthToken() {
        client.clearStore();
        await AsyncStorage.setItem('AUTH_TOKEN', data?.user_sign_up?.authToken);
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

  const onSignUpPress = (): void => {
    if (username.length < 5) {
      alert('Username must be at least 5 characters long.');
      return;
    }

    if (name.length === 0) {
      alert('You must enter a name.');
      return;
    }

    if (password.length < 5) {
      alert('Password must be at least 5 characters long.');
      return;
    }

    if (retypedPassword.lenght === 0) {
      alert('Please retype your password.');
      return;
    }

    if (password !== retypedPassword) {
      alert('Passwords do not match.');
      return;
    }

    commitSignUpMutation();
  };

  return (
    <>
      <View style={styles.root}>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput placeholder="Username" onChangeText={setUsername} />
            <TextInput placeholder="Full name" onChangeText={setName} />
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Re-type password"
              onChangeText={setRetypedPassword}
              secureTextEntry={true}
            />
            <Button text="Confirm" onPress={onSignUpPress} loading={loading} />
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerLabel}>
          Already have an account?{' '}
          <Text onPress={() => goBack()} style={styles.bold}>
            Log in.
          </Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 25,
  },
  inputContainer: {
    marginTop: 16,
    width: Dimensions.get('window').width,
  },
  inputView: {
    marginHorizontal: 25,
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

export default React.memo<Props>(SignUpScreen);
