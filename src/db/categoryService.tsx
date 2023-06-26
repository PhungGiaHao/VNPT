import {enablePromise} from 'react-native-sqlite-storage';
import {ICATEGORY} from '../common/common';
import {openDatabase} from './initDatabase';

enablePromise(true);

export const getCategoryAll = async (): Promise<ICATEGORY[] | null> => {
  const db = await openDatabase();
  const category = await db.executeSql('SELECT * FROM category');
  if (category[0].rows.length > 0) {
    return category[0].rows.raw();
  }
  return null;
};

export const getCategoryByName = async (
  name: string,
): Promise<ICATEGORY | null> => {
  const db = await openDatabase();
  const category = await db.executeSql(
    'SELECT * FROM category WHERE name = ?',
    [name],
  );
  if (category[0].rows.length > 0) {
    return category[0].rows.item(0);
  }
  return null;
};
