import {createStackNavigator} from '@react-navigation/stack';
import HomeAdmin from '../screen/Admin/HomeAdmin';
import {useData} from '../hook';
import React, {useEffect} from 'react';
import ManagerSales from '../screen/MangeSale/ManagerSales';
import InputSales from '../screen/InputSale/InputSales';
import Profile from '../screen/Profile/Profile';
import SaleProfiles from '../screen/SaleProfiles/SaleProfiles';
import {RootStackParamList} from './TypesNavigation';
import HomeUser from '../screen/User/HomeUser';
import UserSaleProfile from '../screen/UserSaleProfile/UserSaleProfile';
const Stack = createStackNavigator<RootStackParamList>();

export default function MainStack() {
  const {user, getAllCategory} = useData();
  useEffect(() => {
    console.log('haha');
    getAllCategory();
  }, [getAllCategory]);
  return (
    <Stack.Navigator screenOptions={Options}>
      {user.role === 'Admin' && (
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
      )}
      {user.role === 'User' && (
        <Stack.Screen name="HomeUser" component={HomeUser} />
      )}
      <Stack.Screen name="ManagerSales" component={ManagerSales} />
      <Stack.Screen name="InputSales" component={InputSales} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SalesProfile" component={SaleProfiles} />
      <Stack.Screen name="UserSaleProfile" component={UserSaleProfile} />
    </Stack.Navigator>
  );
}
const Options = {
  headerTransparent: true,
  headerTitle: () => null,
  headerBackTitleVisible: false,
  headerTintColor: '#3c3c3c',
  headerShown: false,
};
