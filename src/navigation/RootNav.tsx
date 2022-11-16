import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '../store/hook';
import BottomTabNav from './BottomTabNav';
import {StackNav} from './StackNav';

export default function RootNav() {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  return (
    <NavigationContainer>
      {!isAuth ? <StackNav /> : <BottomTabNav />}
    </NavigationContainer>
  );
}
