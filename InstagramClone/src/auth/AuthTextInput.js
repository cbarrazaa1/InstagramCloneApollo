/**
 * @format
 * @flow strict
 */

import {StyleSheet, View, TextInput} from 'react-native';
import * as React from 'react';
type ViewStyleProp = React.ElementProp<typeof View, 'style'>;

type Props = {|
  +placeholder: String,
  +style?: ViewStyleProp,
  +onChangeText: (text: string) => void,
|};

const AuthTextInput = ({
  placeholder,
  style,
  onChangeText,
}: Props): React.Node => {
  return (
    <View style={[style, styles.root]}>
      <TextInput placeholder={placeholder} style={styles.input} />
    </View>
  );
};

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
