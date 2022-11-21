import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import RootNav from './src/navigation/RootNav';
import {RootStore} from './src/store/store';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    requestUserPermission();

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    // });
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log(remoteMessage.notification);
    //     }
    //   });
  }, []);
  return (
    <>
      <Provider store={RootStore}>
        <RootNav />
      </Provider>
    </>
  );
}
