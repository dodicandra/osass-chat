import {StackScreenProps} from '@react-navigation/stack';
import {BubleChat, Header, InputChat} from 'components';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setChatDataServices,
  setChatHistorySevices,
  getUserChat,
  sendNewChat,
  updateChat
} from 'services';
import {
  ChatDataTypes,
  clearChatActions,
  RootState,
  UsersDataTypes
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
    dispatch(setChatDataServices(param?.uid!));
    return () => {};
  }, [dispatch, param]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      scrollRef.current!.scrollToEnd();
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener('blur', () => {
      dispatch(clearChatActions());
    });
  }, [dispatch, navigation]);

  const send = () => {
    const data: ChatDataTypes = {
      content: state,
      sender: User?.uid!,
      tanggal: moment().toISOString(),
      time: moment().toISOString()
    };
    sendChat(data);
    dispatch(setChatHistorySevices());
    setState('');
  };

  const sendChat = async (data: ChatDataTypes) => {
    try {
      const chatKey = await getUserChat(param?.uid);

      if (!chatKey) {
        await sendNewChat(User.uid, param?.uid, data);
        dispatch(setChatDataServices(param?.uid));
      }
      await updateChat(User.uid, param?.uid, chatKey?.chatKey, data);
      dispatch(setChatDataServices(param?.uid));
    } catch (err) {
      console.log(err);
    }
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
    backgroundColor: colors.background.white
  },
  scroll: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: -10,
    zIndex: -99
  },
  contentContainerStyle: {
    paddingVertical: 10,
    paddingTop: 20
  },
  chatContainer: {flex: 1, backgroundColor: colors.background.white},
  chatTanggal: {
    fontFamily: Fonts.Monstserrat.R,
    fontSize: 10,
    color: colors.text.black,
    textAlign: 'center',
    marginVertical: 15
  }
});
