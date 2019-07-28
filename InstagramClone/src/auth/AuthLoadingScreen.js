/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';

type Props = {||};

function LoadingScreen(_: Props): React.Node {
  const {navigate} = useNavigation();

  return (
    <View>
      <Text onPress={() => navigate('App')}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default React.memo<Props>(LoadingScreen);
