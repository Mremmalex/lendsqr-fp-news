import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import {firebase as firebaseAnalytics} from '@react-native-firebase/analytics';
import {firebase as fireBasePerf} from '@react-native-firebase/perf';
import {useAppDispatch, useAppSelector} from '../store/hook';
import BottomTabNav from './BottomTabNav';
import {StackNav} from './StackNav';
import {userLoginState} from '../store/auth';

export default function RootNav() {
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const dispatch = useAppDispatch();

  async function enableAnalytics() {
    await firebaseAnalytics.analytics().setAnalyticsCollectionEnabled(true);
    await fireBasePerf.perf().setPerformanceCollectionEnabled(true);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        const payload = {
          id: user?.uid,
          givenName: user?.displayName,
          email: user?.email,
        };
        dispatch(userLoginState(payload));
      }
    });
    return subscriber;
  }, [dispatch]);

  useEffect(() => {
    remoteConfig()
      .setDefaults({
        allow_call: false,
      })
      .then(() => {
        console.log('config defaults set');
      });
    enableAnalytics();
  }, []);
  return (
    <NavigationContainer>
      {!isAuth ? <StackNav /> : <BottomTabNav />}
    </NavigationContainer>
  );
}
