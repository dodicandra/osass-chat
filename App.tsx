import {NavigationContainer} from '@react-navigation/native';
import {Loading, Splash} from 'components';
import React, {useEffect, useState} from 'react';
import {Modal, StatusBar} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Auth, DrawerScreen} from 'router';
import {NotifService} from 'services';
import {RootState, setToken, store} from 'store';
import {colors, getToLocal, sortArr} from 'utils';

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
  const History = store.getState();
  const notif = new NotifService();
  const scheduler = sortArr(History.Chat.history);
  const title = scheduler.map((item) => item.lastchat.content);

  useEffect(() => {
    notif.localNotif({
      soundName: null,
      message: title[0],
      title: 'Pesan Baru',
    });
  }, []);

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
