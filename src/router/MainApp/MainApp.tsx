import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from 'screen';

const {Navigator, Screen} = createStackNavigator();

export const MainApp = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};
