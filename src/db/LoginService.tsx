import {enablePromise} from 'react-native-sqlite-storage';
import {IUSER} from '../common/common';
import {openDatabase} from './initDatabase';
enablePromise(true);
export const checkLogin = async (username: string): Promise<IUSER | null> => {
  const db = await openDatabase();
  //get user information
  const user = await db.executeSql('SELECT * FROM user WHERE userName = ?', [
    username,
  ]);
  if (user[0].rows.length > 0) {
    return user[0].rows.item(0);
  }
  return null;
};

export const getUserById = async (id: number): Promise<IUSER | null> => {
  const db = await openDatabase();
  //get user information
  const user = await db.executeSql('SELECT * FROM user WHERE id = ?', [id]);
  if (user[0].rows.length > 0) {
    return user[0].rows.item(0);
  }
  return null;
};
