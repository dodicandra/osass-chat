import {NavigationContainer} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {Modal, StatusBar} from 'react-native';
import {connect, Provider} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

import {Loading, Splash} from 'components';
import {Auth, DrawerScreen} from 'router';
import {RootState, setToken, store, UserActionType} from 'store';
import {colors, getToLocal} from 'utils';

interface MainAppProps {
  UI: RootState['UI'];
  User: RootState['User'];
  setUserToken: (token: string) => any;
}

const MainApp: FC<MainAppProps> = ({UI, User, setUserToken}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToLocal('token');
        setUserToken(token);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setUserToken]);

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

const mapState = (state: RootState) => ({
  User: state.User,
  UI: state.UI
});

const mapDispatch = (dispatch: ThunkDispatch<any, any, UserActionType>) => ({
  setUserToken: (token: string) => dispatch(setToken(token))
});

const MainAppWraper = connect(mapState, mapDispatch)(MainApp);

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.background.yellow} barStyle="dark-content" animated />
      <MainAppWraper />
    </Provider>
  );
};

export default App;
