import {DrawerItemList, DrawerContentOptions} from '@react-navigation/drawer';
import {UserVer} from 'assets';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {DrawerNavigationState} from '@react-navigation/native';
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
  DrawerScreenProps,
} from '@react-navigation/drawer/lib/typescript/src/types';
import Button from '../Button/Button';
import {removeLocal} from 'utils';
import {useDispatch} from 'react-redux';
import {clearToken} from 'store';

type Navigators = DrawerNavigationHelpers & DrawerScreenProps<DrawerStack>;

type Props = Omit<DrawerContentOptions, 'contentContainerStyle' | 'style'> &
  Navigators & {
    state: DrawerNavigationState;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
  };

const Drawer: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const logOut = async () => {
    await removeLocal('token');
    props.navigation.closeDrawer();
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
    flex: 1,
  },
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
  },
  logout: {position: 'absolute', bottom: 20, alignSelf: 'center'},
});