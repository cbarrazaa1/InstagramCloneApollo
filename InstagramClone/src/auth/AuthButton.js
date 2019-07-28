/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {|
  +text: string,
  +onPress: () => void,
|};

function AuthButton({text, onPress}: Props): React.Node {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.root}>
        <Text style={styles.textLabel}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#5ca5ff',
    borderRadius: 4,
    alignItems: 'center',
  },
  textLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 15,
  },
});

export default React.memo<Props>(AuthButton);
