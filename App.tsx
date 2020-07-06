import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, StatusBar } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { Loading, Splash } from 'components';
import { Auth, DrawerScreen } from 'router';
import { RootState, setToken, store } from 'store';
import { colors, getToLocal } from 'utils';

const MainApp = () => {
  const [loading, setLoading] = useState(true);

  const User = useSelector((state: RootState) => state.User);
  const UI = useSelector((state: RootState) => state.UI);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = await getToLocal('token');
        await dispatch(setToken(token));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  if (loading) {
    return <Splash visible={loading} />;
  }

  return (
    <NavigationContainer>
      {User.token === null ? <Auth /> : <DrawerScreen />}
      <Modal animationType="slide" animated transparent visible={UI.loading}>
        <Loading />
      </Modal>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={colors.background.yellow}
        barStyle="dark-content"
        animated
      />
      <MainApp />
    </Provider>
  );
};

export default App;
