import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {Header, List} from 'components';
import React, {useEffect, useCallback} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDataAction, setChatHistorySevices} from 'services';
import {RootState} from 'store';
import {colors, Fonts, sortArr} from 'utils';

type MainStackApp = StackScreenProps<StackMainApp, 'Home'>;
type Drawer = DrawerScreenProps<DrawerStack>;

type HomeProps = MainStackApp & Drawer;

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const History = useSelector((state: RootState) => state.Chat.history);
  const User = useSelector((state: RootState) => state.User);

  const disptach = useDispatch();

  const decs = sortArr(History);

  const getData = useCallback(() => {
    disptach(getUserDataAction());
    disptach(setChatHistorySevices());
    return () => {};
  }, [disptach]);

  useEffect(() => {
    getData();
    return () => {};
  }, [disptach, getData]);

  return (
    <View style={styles.container}>
      <Header
        imgProfile={{uri: User.user?.imgUrl}}
        onPress={() => navigation.openDrawer()}
        title="Ossas"
      />
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
