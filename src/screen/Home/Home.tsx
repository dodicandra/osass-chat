import React, {useCallback, useEffect} from 'react';

import {Header, List} from 'components';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {getUserDataAction, setChatHistorySevices} from 'services';
import {RootState} from 'store';
import {colors, sortArr, Fonts} from 'utils';
import {showNotif} from 'utils/notife';

import fireMsg, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';

type MainStackApp = StackScreenProps<StackMainApp, 'Home'>;
type Drawer = DrawerScreenProps<DrawerStack>;

interface Props {
  History: RootState['Chat']['history'];
  User: RootState['User'];
  getUserData: typeof getUserDataAction;
  setChatHistory: typeof setChatHistorySevices;
}

type HomeProps = MainStackApp & Drawer & Props;

const HomeApp: React.FC<HomeProps> = ({navigation, History, User, getUserData, setChatHistory}) => {
  const decs = sortArr(History);

  const getData = useCallback(() => {
    getUserData();
    setChatHistory();
  }, [getUserData, setChatHistory]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const subs = fireMsg().onMessage(async (res: FirebaseMessagingTypes.RemoteMessage) => {
      await showNotif(res);
    });

    return () => {
      subs();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header imgProfile={{uri: User.user?.imgUrl!}} onPress={() => navigation.openDrawer()} title="Ossas" />
      {History.length <= 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background.white,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontFamily: Fonts.Monstserrat.M,
              fontSize: 18,
              color: colors.text.black
            }}>
            Belum ada chat
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          style={styles.bodyContainer}>
          {decs.map((item) => (
            <List
              key={item.chatKey}
              profilePress={() => navigation.navigate('UserVisited', {...item})}
              imgUrl={{uri: item.imgUrl}}
              title={item.name}
              titlePress={() =>
                navigation.navigate('Chat', {
                  ...item.lastchat,
                  ...item
                })
              }
              desc={item.lastchat.content}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const mapState = (state: RootState) => ({
  History: state.Chat.history,
  User: state.User
});

const mapDispatch = (dispatch: any) => ({
  getUserData: () => dispatch(getUserDataAction()),
  setChatHistory: () => dispatch(setChatHistorySevices())
});

export const Home = connect(mapState, mapDispatch)(HomeApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white
  },
  bodyContainer: {
    flex: 1,
    zIndex: -1,
    marginHorizontal: 8,
    marginTop: -10,
    backgroundColor: colors.background.white
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10
  }
});
