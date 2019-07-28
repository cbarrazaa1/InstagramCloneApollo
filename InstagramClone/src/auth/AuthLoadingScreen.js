/**
 * @format
 * @flow strict
 */
'use strict';
import * as React from 'react';
import {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const query = gql`
  query AuthLoadingScreenQuery {
    viewer {
      id
      username
    }
  }
`;

type Props = {||};

function LoadingScreen(_: Props): React.Node {
  const {navigate} = useNavigation();
  const {data, loading} = useQuery(query);

  useEffect(() => {
    if (!loading) {
      navigate(data.viewer == null ? 'Auth' : 'Feed');
    }
  }, [loading]);

  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default React.memo<Props>(LoadingScreen);
