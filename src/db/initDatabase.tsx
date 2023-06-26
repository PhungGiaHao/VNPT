import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  DATABASE_NAME,
  TABLE_CATEGORY,
  TABLE_USER,
  createTables,
  insertInitialCategoryData,
  insertInitialUserData,
} from './databaseHelper';

export const initializeApp = async () => {
  try {
    const db = await openDatabase();
    await createTables(db);

    const user = await checkTableValues(db, TABLE_USER);
    if (!user) {
      console.log('Inserting initial user data');
      await insertInitialUserData(db);
    } else {
      console.log('Database user initialized');
    }
    const category = await checkTableValuesCategory(db, TABLE_CATEGORY);
    if (!category) {
      console.log('Inserting initial category data');
      await insertInitialCategoryData(db);
    } else {
      console.log('Database category initialized');
    }
  } catch (err) {
    console.log(err);
  }
};

export const openDatabase = (): Promise<SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    SQLite.enablePromise(true);

    const db = SQLite.openDatabase(
      {
        name: DATABASE_NAME,
        location: 'default',
      },
      () => {
        console.log('Database opened');
        resolve(db);
      },
      (error: any) => {
        console.log('Error opening database:', error);
        reject(error);
      },
    );
  });
};

const checkTableValues = (
  db: SQLiteDatabase,
  tableName: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT COUNT(*) FROM ${tableName}`,
        [],
        (_, {rows}) => {
          const rowCount = rows.item(0)['COUNT(*)'];
          resolve(rowCount > 0);
        },
        (_, error) => {
          console.log(`Error checking table values for ${tableName}:`, error);
          reject(error);
        },
      );
    });
  });
};
const checkTableValuesCategory = (
  db: SQLiteDatabase,
  tableName: string,
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE name = ?`,
        ['Sim Di Động'],
        (_, {rows}) => {
          const rowCount = rows.length;
          resolve(rowCount > 0);
        },
        (_, error) => {
          console.log(`Error checking table values for ${tableName}:`, error);
          reject(error);
        },
      );
    });
  });
};
