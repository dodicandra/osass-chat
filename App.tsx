import {NavigationContainer} from '@react-navigation/native';
import {Loading} from 'components';
import React, {useEffect} from 'react';
import {Modal, StatusBar} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Auth, MainRouter} from 'router';
import {RootState, setToken, store} from 'store';
import {colors, getToLocal} from 'utils';

const MainApp = () => {
  const User = useSelector((state: RootState) => state.User);
  const UI = useSelector((state: RootState) => state.UI);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = await getToLocal('token');
        dispatch(setToken(token));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [User.token, dispatch]);

  return (
    <NavigationContainer>
      {User.token === null ? <Auth /> : <MainRouter />}
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
