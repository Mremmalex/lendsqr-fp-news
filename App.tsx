import React from 'react';
import {Provider} from 'react-redux';
import RootNav from './src/navigation/RootNav';
import {RootStore} from './src/store/store';

export default function App() {
  return (
    <>
      <Provider store={RootStore}>
        <RootNav />
      </Provider>
    </>
  );
}
