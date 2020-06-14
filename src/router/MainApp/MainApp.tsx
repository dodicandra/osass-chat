import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, UserProfile} from 'screen';

const {Navigator, Screen} = createStackNavigator();

export const MainRouter = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="UserProfile" component={UserProfile} />
    </Navigator>
  );
};
