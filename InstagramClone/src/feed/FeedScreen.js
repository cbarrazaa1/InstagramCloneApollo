/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type Props = {||};

function FeedScreen(_: Props): React.Node {
  return (
    <View>
      <Text>Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default React.memo<Props>(FeedScreen);
