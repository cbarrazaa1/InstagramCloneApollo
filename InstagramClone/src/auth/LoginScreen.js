/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from './AuthButton';
// $FlowFixMe
import Logo from '../../res/instagram-logo.png';
import {Mutation} from 'react-apollo';
import TextInput from './AuthTextInput';
import {gql} from 'apollo-boost';
import {useNavigation} from 'react-navigation-hooks';

type Props = {||};

const mutation = gql`
  mutation SignUpMutation($username: String!, $password: String!) {
    user_sign_up(username: $username, password: $password) {
      username
    }
  }
`;

function LoginScreen(_: Props): React.Node {
  const {navigate} = useNavigation();
  return (
    <>
      <View style={styles.root}>
        <Image style={styles.logo} source={Logo} />
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" secureTextEntry={true} />
            <Button text="Log In" onPress={() => null} />
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
