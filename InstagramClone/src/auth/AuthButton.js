/**
 * @format
 * @flow strict
 */

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as React from 'react';

type Props = {|
  +text: string,
  +onPress: () => void,
|};

const AuthButton = ({text, onPress}: Props): React.Node => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.root}>
        <Text style={styles.textLabel}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
