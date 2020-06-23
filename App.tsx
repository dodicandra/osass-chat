import {NavigationContainer} from '@react-navigation/native';
import {Loading, Splash} from 'components';
import React, {useEffect, useState} from 'react';
import {Modal, StatusBar} from 'react-native';
//@ts-expect-error
import OneSignal from 'react-native-onesignal';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Auth, DrawerScreen} from 'router';
import {RootState, setToken, store} from 'store';
import {colors, getToLocal} from 'utils';

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
  OneSignal.setLogLevel(6, 0);

  OneSignal.init('2e4f9f18-4700-452a-8510-a1162015e160', {
    kOSSettingsKeyAutoPrompt: false,
    kOSSettingsKeyInAppLaunchURL: false,
    kOSSettingsKeyInFocusDisplayOption: 2,
  });
  OneSignal.inFocusDisplaying(2);

  const onReceived = (notification: any) => {
    console.log('Notification received: ', notification);
  };

  const onOpened = (openResult: {
    notification: {
      payload: {body: any; additionalData: any};
      isAppInFocus: any;
    };
  }) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = (device: any) => {
    console.log('Device info: ', device);
  };
  const myiOSPromptCallback = (_permission: any) => {};

  useEffect(() => {
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
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
