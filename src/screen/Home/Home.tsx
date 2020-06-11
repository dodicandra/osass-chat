import {Header, List} from 'components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from 'utils';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.bodyContainer}>
        <List />
        <List />
        <List />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  bodyContainer: {
    flex: 1,
    zIndex: -1,
    marginHorizontal: 15,
  },
});
