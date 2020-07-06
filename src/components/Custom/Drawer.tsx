import firebase from 'react-native-firebase';
import {
  DrawerContentComponentProps,
  DrawerItemList
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { UserVer } from 'assets';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearToken } from 'store';
import { removeLocal } from 'utils';
import Button from '../Button/Button';

type Props = DrawerContentComponentProps;

const Drawer: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const logOut = async () => {
    firebase.auth().signOut;
    await removeLocal('token');
    props.navigation.dispatch(DrawerActions.closeDrawer());
    dispatch(clearToken());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={UserVer} style={styles.image} />
      <DrawerItemList {...props} />
      <View style={styles.logout}>
        <Button title="log-out" onPress={logOut} />
      </View>
    </SafeAreaView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'contain'
  },
  logout: { position: 'absolute', bottom: 20, alignSelf: 'center' }
});
