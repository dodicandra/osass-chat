import {speaker} from 'assets';
import {Header, InputChat, BubleChat} from 'components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from 'utils';

export const Chats = () => {
  return (
    <View style={styles.container}>
      <Header title="dodi candra" icon="ios-arrow-back" imgProfile={speaker} />
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        <BubleChat />
        <BubleChat sender />
        <BubleChat />
        <BubleChat sender />
        <BubleChat />
        <BubleChat sender />
        <BubleChat />
        <BubleChat sender />
        <BubleChat />
        <BubleChat sender />
        <BubleChat />
        <BubleChat content="http://google.com" sender />
      </ScrollView>
      <InputChat />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  scroll: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: -10,
    zIndex: -99,
  },
  contentContainerStyle: {
    paddingVertical: 10,
    paddingTop: 20,
  },
});
