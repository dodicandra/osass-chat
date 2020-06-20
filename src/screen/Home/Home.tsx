import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {Header, List} from 'components';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDataAction, setChatHistorySevices} from 'services';
import {RootState} from 'store';
import {colors} from 'utils';

type MainStackApp = StackScreenProps<StackMainApp, 'Home'>;
type Drawer = DrawerScreenProps<DrawerStack>;

type HomeProps = MainStackApp & Drawer;

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const History = useSelector((state: RootState) => state.Chat.history);
  const User = useSelector((state: RootState) => state.User);
  console.log('History', History);

  const disptach = useDispatch();

  useEffect(() => {
    disptach(getUserDataAction());
    disptach(setChatHistorySevices());
  }, [disptach]);

  return (
    <View style={styles.container}>
      <Header
        imgProfile={{uri: User.user?.imgUrl}}
        onPress={() => navigation.openDrawer()}
        title="Ossas"
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        style={styles.bodyContainer}>
        {History.map((item) => (
          <List
            key={item.chatKey}
            profilePress={() => navigation.navigate('UserVisited')}
            imgUrl={{uri: item.imgUrl}}
            title={item.name}
            titlePress={() =>
              navigation.navigate('Chat', {
                ...item.lastchat,
                ...item,
              })
            }
            desc={item.lastchat.content}
          />
        ))}
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
    marginHorizontal: 8,
    marginTop: -10,
    backgroundColor: colors.background.white,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
