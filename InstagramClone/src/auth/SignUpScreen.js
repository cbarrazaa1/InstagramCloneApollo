/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Button from './AuthButton';
import TextInput from './AuthTextInput';
import {useNavigation} from 'react-navigation-hooks';

type Props = {||};

function SignUpScreen(_: Props): React.Node {
  const {goBack} = useNavigation();

  return (
    <>
      <View style={styles.root}>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Full name" />
            <TextInput placeholder="Password" secureTextEntry={true} />
            <Button text="Confirm" />
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
