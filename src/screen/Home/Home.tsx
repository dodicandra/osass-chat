import {StackScreenProps} from '@react-navigation/stack';
import {Header, List} from 'components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearToken} from 'store';
import {colors, removeLocal} from 'utils';

type MainStackApp = StackScreenProps<StackMainApp, 'Home'>;

interface HomeProps extends MainStackApp {}

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const logOut = async () => {
    await removeLocal('token');
    dispatch(clearToken());
  };

  return (
    <View style={styles.container}>
      <Header onPress={logOut} title="Ossas" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        style={styles.bodyContainer}>
        <List profilePress={() => navigation.navigate('UserProfile')} />
        <List />
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
    marginHorizontal: 8,
    marginTop: -10,
    backgroundColor: colors.background.white,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
