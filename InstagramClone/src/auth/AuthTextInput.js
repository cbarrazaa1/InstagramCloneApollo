/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
type ViewStyleProp = React.ElementProp<typeof View, 'style'>;

type Props = {|
  +placeholder: string,
  +secureTextEntry?: boolean,
  +style?: ViewStyleProp,
  +onChangeText: (text: string) => void,
|};

function AuthTextInput({
  placeholder,
  secureTextEntry = false,
  style,
  onChangeText,
}: Props): React.Node {
  return (
    <View style={[style, styles.root]}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fafafa',
    borderRadius: 4,
    borderColor: '#dce0e6',
    borderWidth: 1,
    justifyContent: 'center',
    height: 45,
    marginBottom: 16,
  },
  input: {
    marginHorizontal: 8,
  },
});

export default React.memo<Props>(AuthTextInput);
