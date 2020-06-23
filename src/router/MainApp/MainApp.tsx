import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home, UserProfile, UserVisited, Chats, AllUser} from 'screen';
import {DrawerCustom} from 'components';
import {Icons, colors, Fonts} from 'utils';
import {View, Text, StyleSheet} from 'react-native';

interface ListDrawerProps {
  color: string;
  title: string;
  iconType: 'account-search-outline' | 'edit' | 'home';
}

const {Navigator, Screen} = createStackNavigator<StackMainApp>();

const Drawer = createDrawerNavigator<DrawerStack>();

export const DrawerScreen = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerCustom {...props} />}
    drawerContentOptions={{
      activeTintColor: colors.text.black,
      inactiveTintColor: colors.text.greey,
      labelStyle: {fontFamily: Fonts.Monstserrat.M, fontSize: 18},
      activeBackgroundColor: 'transparent'
    }}
    initialRouteName="Root">
    <Drawer.Screen
      name="Root"
      options={{
        drawerLabel: 'Home',
        drawerIcon: ({color}) => (
          <ListDrawer iconType="home" color={color} title="Home" />
        ),
        swipeEnabled: false
      }}
      component={MainRouter}
    />
    <Drawer.Screen
      name="UserProfile"
      options={{
        drawerLabel: '',
        drawerIcon: ({color}) => (
          <ListDrawer iconType="edit" color={color} title="Edit Profile" />
        )
      }}
      component={UserProfile}
    />
    <Drawer.Screen
      name="AllUsers"
      options={{
        drawerLabel: '',
        drawerIcon: ({color}) => (
          <ListDrawer
            iconType="account-search-outline"
            color={color}
            title="Cari Teman"
          />
        )
      }}
      component={AllUser}
    />
  </Drawer.Navigator>
);

export const MainRouter = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push'
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="UserProfile" component={UserProfile} />
      <Screen name="UserVisited" component={UserVisited} />
      <Screen name="Chat" component={Chats} />
    </Navigator>
  );
};

const ListDrawer: React.FC<ListDrawerProps> = ({color, title, iconType}) => {
  return (
    <View style={style.container}>
      {iconType === 'edit' ? (
        <Icons.AntDesign name="edit" size={25} color={color} />
      ) : iconType === 'home' ? (
        <Icons.AntDesign name="home" size={25} color={color} />
      ) : (
        <Icons.MaterialCommunityIcons
          name="account-search-outline"
          size={25}
          color={color}
        />
      )}
      <View style={style.wraper}>
        <Text style={[style.text, {color}]}>{title}</Text>
        <View style={[style.gap, {borderBottomColor: color}]} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 30,
    fontFamily: Fonts.Monstserrat.M,
    fontSize: 18
  },
  gap: {
    borderBottomWidth: 2,
    marginLeft: 30,
    marginTop: 7,
    width: '100%'
  },
  wraper: {
    width: '70%'
  }
});
