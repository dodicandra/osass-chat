import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import {Auth} from 'router';
import {store} from 'store';

const MainApp = () => {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
