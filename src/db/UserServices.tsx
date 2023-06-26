import {enablePromise} from 'react-native-sqlite-storage';
import {IUSER} from '../common/common';
import {openDatabase} from './initDatabase';

enablePromise(true);

export const getUsers = async (): Promise<IUSER[]> => {
  const db = await openDatabase();
  //get user information
  const user = await db.executeSql('SELECT * FROM user where role != ?', [
    'Admin',
  ]);
  if (user[0].rows.length > 0) {
    return user[0].rows.raw();
  }
  return [];
};
