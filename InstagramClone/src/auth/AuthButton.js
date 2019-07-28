/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {|
  +text: string,
  +onPress: () => void,
  +loading?: boolean,
|};

function AuthButton({text, onPress, loading = false}: Props): React.Node {
  return (
    <TouchableOpacity onPress={loading ? null : onPress}>
      <View style={styles.root}>
        {loading ? (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="small"
            color="white"
          />
        ) : (
          <Text style={[styles.textLabel, loading && styles.loadingLabel]}>
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#5ca5ff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  textLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 15,
  },
  activityIndicator: {
    marginLeft: 8,
  },
});

export default React.memo<Props>(AuthButton);
