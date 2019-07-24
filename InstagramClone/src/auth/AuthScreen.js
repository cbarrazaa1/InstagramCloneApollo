/**
 * @format
 * @flow strict
 */
import Button from './AuthButton';
import TextInput from './AuthTextInput';
import {Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import * as React from 'react';
// $FlowFixMe
import Logo from '../../res/instagram-logo.png';

type Props = {||};

const mutation = gql`
  mutation SignUpMutation($username: String!, $password: String!) {
    user_sign_up(username: $username, password: $password) {
      username
    }
  }
`;
const AuthScreen = (): React.Node => {
  return (
    <>
      <View style={styles.root}>
        <Image style={styles.logo} source={Logo} />
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" />
            <Mutation
              mutation={mutation}
              variables={{username: 'cbarrazaa2', password: 'test'}}
            >
              {userSignUp => <Button text="Log In" onPress={userSignUp} />}
            </Mutation>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerLabel}>
          Don't have an account? <Text style={styles.bold}>Sign up.</Text>
        </Text>
      </View>
    </>
  );
};

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

export default React.memo<Props>(AuthScreen);
