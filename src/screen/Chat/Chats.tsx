import {StackScreenProps} from '@react-navigation/stack';
import {speaker} from 'assets';
import {BubleChat, Header, InputChat} from 'components';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from 'utils';

type ChatProps = StackScreenProps<StackMainApp, 'Chat'>;

export const Chats: React.FC<ChatProps> = ({navigation}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [state, setState] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      scrollRef.current!.scrollToEnd();
    });
  }, [navigation]);

  const disabled = state.length > 0;
  return (
    <View style={styles.container}>
      <Header
        onPress={() => navigation.goBack()}
        title="dodi candra"
        icon="ios-arrow-back"
        imgProfile={speaker}
      />
      <ScrollView
        ref={scrollRef}
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
      <InputChat
        disabled={!disabled}
        onChangeText={(val) => setState(val)}
        value={state}
      />
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
