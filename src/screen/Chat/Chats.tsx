import {StackScreenProps} from '@react-navigation/stack';
import {BubleChat, Header, InputChat} from 'components';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {sendChat, setChatDataServices, setChatHistorySevices} from 'services';
import {
  RootState,
  UsersDataTypes,
  clearChatActions,
  ChatDataTypes,
} from 'store';
import {colors, Fonts} from 'utils';

type ChatProps = StackScreenProps<StackMainApp<UsersDataTypes>, 'Chat'>;

export const Chats: React.FC<ChatProps> = ({navigation, route}) => {
  const param = route.params;

  const Chat = useSelector((state: RootState) => state.Chat.chat);
  const User = useSelector((state: RootState) => state.User.user);
  const dispatch = useDispatch();
  const scrollRef = useRef<ScrollView>(null);
  const [state, setState] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      scrollRef.current!.scrollToEnd();
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(setChatDataServices(param?.id!));
  }, [User, dispatch, param]);

  useEffect(() => {
    navigation.addListener('blur', () => {
      dispatch(clearChatActions());
    });
  }, [dispatch, navigation]);

  const send = async () => {
    const data: ChatDataTypes = {
      content: state,
      sender: User?.uid!,
      tanggal: moment().toISOString(),
      time: moment().toISOString(),
    };
    dispatch(sendChat(User.uid!, param?.id!, data));
    dispatch(setChatHistorySevices());
    // dispatch(sendChatServeices(User?.uid, param?.id, data));
    setState('');
  };

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
        onLayout={() => scrollRef.current?.scrollToEnd()}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        {Chat.map((item) => (
          <View key={item.time as string} style={styles.chatContainer}>
            <BubleChat
              time={item.time}
              imgLeft={{uri: param?.imgUrl}}
              sender={item.sender === User.uid}
              content={item.content as string}
            />
          </View>
        ))}
      </ScrollView>
      <InputChat
        disabled={!disabled}
        onChangeText={(val) => setState(val)}
        value={state}
        onSubmit={send}
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
  chatContainer: {flex: 1, backgroundColor: colors.background.white},
  chatTanggal: {
    fontFamily: Fonts.Monstserrat.R,
    fontSize: 10,
    color: colors.text.black,
    textAlign: 'center',
    marginVertical: 15,
  },
});
