import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Login, Register, UserNameVerifikasi} from 'screen';

const {Navigator, Screen} = createStackNavigator();

export const Auth = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Login" component={Login} />
      <Screen name="UserNameVerifikasi" component={UserNameVerifikasi} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
};
