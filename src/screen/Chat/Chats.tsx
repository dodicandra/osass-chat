import {StackScreenProps} from '@react-navigation/stack';
import {BubleChat, Header, InputChat} from 'components';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {sendChatServeices, setChatServices} from 'services';
import {RootState, UsersDataTypes} from 'store';
import {ChatDataTypes, clearChatActions} from 'store/chat';
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
    dispatch(setChatServices(param?.id, User?.uid));
  }, [User, dispatch, param]);

  useEffect(() => {
    navigation.addListener('blur', () => {
      dispatch(clearChatActions());
    });
  }, [dispatch, navigation]);

  const send = () => {
    const data: ChatDataTypes = {
      content: state,
      sender: User?.uid!,
      tanggal: moment().format('YYYY-MM-DD'),
      time: moment().format('hh:mm:ss A'),
    };

    dispatch(sendChatServeices(param?.id, User?.uid, data));
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
          <View key={item.tanggal as string} style={styles.chatContainer}>
            <Text style={styles.chatTanggal}>{item.tanggal}</Text>
            {item.data?.map((chat) => (
              <BubleChat
                key={chat.time as string}
                time={chat.time}
                imgLeft={{uri: param?.imgUrl}}
                sender={chat.sender}
                content={chat.content as string}
              />
            ))}
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
