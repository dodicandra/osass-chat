import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Register, VerifikasiCode, UserNameVerifikasi} from 'screen';

const Stack = createStackNavigator();

export const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifikasiCode" component={VerifikasiCode} />
      <Stack.Screen name="UserNameVerifikasi" component={UserNameVerifikasi} />
    </Stack.Navigator>
  );
};
