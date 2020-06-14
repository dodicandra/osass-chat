import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {colors, Fonts} from 'utils';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.background.yellow} />
      <Text style={styles.loading}>Loading..</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.treansparet,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    color: colors.background.yellow,
    fontSize: 20,
    fontFamily: Fonts.Monstserrat.M,
  },
});
