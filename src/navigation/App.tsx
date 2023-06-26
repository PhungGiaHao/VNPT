import {NavigationContainer} from '@react-navigation/native';
import Login from '../screen/Login';
import {useData} from '../hook';
import React from 'react';
import MainStack from './MainStack';
export function AppStack(): JSX.Element {
  const {user} = useData();

  return (
    <NavigationContainer>
      {user.role ? <MainStack /> : <Login />}
    </NavigationContainer>
  );
}
