import React, {useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ICATEGORY,
  ISALES,
  IUSER,
  IUSERCURRENTSALE,
  IUseData,
} from '../common/common';
import {getUserById} from '../db/LoginService';
import {getUsers} from '../db/UserServices';
import {getCategoryAll, getCategoryByName} from '../db/categoryService';
import {getSalesByUserId} from '../db/salesServices';

export const DataContext = React.createContext({});

export const initialUser: IUSER = {
  id: 0,
  userName: '',
  password: '',
  position: '',
  phone: '',
  name: '',
  positionWork: '',
  mhrCode: '',
  role: '',
};

export const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<IUSER>(initialUser);
  const [users, setUsers] = useState<IUSER[]>([]);
  const [categorys, setCategorys] = useState<ICATEGORY[] | null>(null);
  const [category, setCategory] = useState<ICATEGORY | null>(null);
  const [userSale, setUserSale] = useState<ISALES | null>(null);
  const handleUser = useCallback(
    (payload: IUSER) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser],
  );
  const checkLoginAuth = useCallback(async () => {
    //get user information
    const id = await AsyncStorage.getItem('userId');
    if (id) {
      const User = await getUserById(+id);
      if (User) {
        setUser(User);
      }
    } else {
      console.log('User not found');
    }
  }, [setUser]);
  const getAllUser = useCallback(async () => {
    const id = await AsyncStorage.getItem('userId');
    if (!id) {
      return;
    }
    const usersData = await getUsers();

    setUsers(usersData);
  }, [setUsers]);

  const getAllCategory = useCallback(async () => {
    let categoryData = await getCategoryAll();
    if (!categoryData) {
      categoryData = []; // Set an empty array if categoryData is null
    }
    setCategorys(categoryData);
  }, [setCategorys]);

  const GetCategoryByName = useCallback(async () => {
    let categoryData = await getCategoryByName('Sim Di Động');

    setCategory(categoryData || null);
  }, [setCategory]);

  const getUserSale = useCallback(async (data: IUSERCURRENTSALE) => {
    const result = await getSalesByUserId(data);
    setUserSale(result);
  }, []);

  useEffect(() => {
    checkLoginAuth();
    getAllUser();
    GetCategoryByName();
  }, [checkLoginAuth, getAllUser, GetCategoryByName]);
  const contextValue = {
    user,
    users,
    handleUser,
    category,
    categorys,
    getAllCategory,
    userSale,
    getUserSale,
  };
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext) as IUseData;
