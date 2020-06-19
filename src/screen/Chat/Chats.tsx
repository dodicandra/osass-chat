import {StackScreenProps} from '@react-navigation/stack';
import {BubleChat, Header, InputChat} from 'components';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {UsersDataTypes} from 'store';
import {colors} from 'utils';

type ChatProps = StackScreenProps<StackMainApp<UsersDataTypes>, 'Chat'>;

export const Chats: React.FC<ChatProps> = ({navigation, route}) => {
  const param = route.params;

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
        title={param?.name}
        icon="ios-arrow-back"
        imgProfile={{uri: param?.imgUrl}}
      />
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        <BubleChat imgLeft={{uri: param?.imgUrl}} />
        <BubleChat imgLeft={{uri: param?.imgUrl}} sender />
        <BubleChat imgLeft={{uri: param?.imgUrl}} />
        <BubleChat imgLeft={{uri: param?.imgUrl}} sender />
        <BubleChat imgLeft={{uri: param?.imgUrl}} />
        <BubleChat imgLeft={{uri: param?.imgUrl}} sender />
        <BubleChat imgLeft={{uri: param?.imgUrl}} />
        <BubleChat imgLeft={{uri: param?.imgUrl}} sender />
        <BubleChat imgLeft={{uri: param?.imgUrl}} />
        <BubleChat imgLeft={{uri: param?.imgUrl}} sender />
        <BubleChat imgLeft={{uri: param?.imgUrl}} />
        <BubleChat
          imgLeft={{uri: param?.imgUrl}}
          content="http://google.com"
          sender
        />
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
