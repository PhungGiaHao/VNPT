import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

export const DATABASE_NAME = 'YourDatabase.db';
export const TABLE_USER = 'user';
export const TABLE_CATEGORY = 'category';
export const TABLE_SALES = 'sales';

// Function to initialize the database
const initDatabase = (): Promise<SQLiteDatabase> => {
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
        console.log(error);
        reject(error);
      },
    );
  });
};

const createTables = async (db: SQLiteDatabase): Promise<void> => {
  db.transaction(
    (tx: {
      executeSql: (
        arg0: string,
        arg1: never[],
        arg2: {(): void; (): void; (): void},
        arg3: {(error: any): void; (error: any): void; (error: any): void},
      ) => void;
    }) => {
      // Create user table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLE_USER} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT,
        password TEXT,
        position TEXT,
        phone TEXT,
        name TEXT,
        positionWork TEXT,
        mhrCode TEXT,
        role TEXT
      );`,
        [],
        () => {
          console.log(`Create table ${TABLE_USER} successfully`);
        },
        (error: any) => {
          console.log(error);
        },
      );

      // Create category table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLE_CATEGORY} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      );`,
        [],
        () => {
          console.log(`Create table ${TABLE_CATEGORY} successfully`);
        },
        (error: any) => {
          console.log(error);
        },
      );

      // Create sales table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLE_SALES} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoryId INTEGER,
        userId INTEGER,
        deliveryQuantity INTEGER,
        realQuantity INTEGER,
        revenue INTEGER,
        note TEXT,
        createdAt TEXT,
        updatedAt TEXT,
        FOREIGN KEY (categoryId) REFERENCES ${TABLE_CATEGORY}(id),
        FOREIGN KEY (userId) REFERENCES ${TABLE_USER}(id)
      );`,
        [],
        () => {
          console.log(`Create table ${TABLE_SALES} successfully`);
        },
        (error: any) => {
          console.log(error);
        },
      );
    },
  );
};
export const insertInitialUserData = (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      const users = [
        {
          userName: 'truongnhuquocbao',
          password: 'VNP005282',
          position: 'Giám Đốc PBH',
          phone: '0913813759',
          name: 'Trương Như Quốc Bảo',
          positionWork: 'Giám Đốc PBH Khu Vực',
          mhrCode: 'VNP005282',
          role: 'Admin',
        },
        {
          userName: 'tranthithuhong',
          password: 'VNP005313',
          position: 'NV Hỗ Trợ Kinh Doanh',
          phone: '0919893637',
          name: 'Trần Thị Thu Hồng',
          positionWork: 'NV Kinh Tế Kiêm Quản Lý Thu Cước',
          mhrCode: 'VNP005313',
          role: 'User',
        },
        {
          userName: 'nguyenthanhminh',
          password: 'VNP005314',
          position: 'NV Kinh Doanh',
          phone: '0917477500',
          name: 'Nguyễn Thành Minh',
          positionWork: 'NV Quản Lý Kênh',
          mhrCode: 'VNP005314',
          role: 'User',
        },
        {
          userName: 'chauphuchau',
          password: 'VNP005322',
          position: 'NV Kinh Doanh',
          phone: '0917119774',
          name: 'Châu Phúc Hậu',
          positionWork: 'NV Kinh Doanh Địa Bàn',
          mhrCode: 'VNP005322',
          role: 'User',
        },
        {
          userName: 'nguyenthinhuthao',
          password: 'CTV045699',
          position: 'CV Kinh Doanh',
          phone: '0942667319',
          name: 'Nguyễn Thị Như Thảo',
          positionWork: 'CV Kinh Doanh (AM P.BHKV)',
          mhrCode: 'CTV045699',
          role: 'User',
        },
        {
          userName: 'lethanhnam',
          password: 'VNP005317',
          position: 'Phó GĐ PBH',
          phone: '0919255668',
          name: 'Lê Thành Nam',
          positionWork: 'PGĐ Kiêm Kinh Doanh Địa Bàn',
          mhrCode: 'VNP005317',
          role: 'User',
        },
        {
          userName: 'nguyenthithanhthao',
          password: 'CTV025912',
          position: 'NV Kinh Doanh',
          phone: '0919444211',
          name: 'Nguyễn Thị Thanh Thảo',
          positionWork: 'NV Kinh Doanh Địa Bàn',
          mhrCode: 'CTV025912',
          role: 'User',
        },
        {
          userName: 'phanminhtuong',
          password: 'CTV043882',
          position: 'NV Kinh Doanh',
          phone: '0823342396',
          name: 'Phan Minh Tường',
          positionWork: 'NV Kinh Doanh Địa Bàn',
          mhrCode: 'CTV043882',
          role: 'User',
        },
        {
          userName: 'caomongtuyen',
          password: 'CTV025913',
          position: 'Giao Dịch Viên',
          phone: '0888719729',
          name: 'Cao Mộng Tuyền',
          positionWork: 'NV Giao Dịch',
          mhrCode: 'CTV025913',
          role: 'User',
        },
        {
          userName: 'phambaotho',
          password: 'CTV059790',
          position: 'Giao Dịch Viên',
          phone: '0917280697',
          name: 'Phạm Bão Thơ',
          positionWork: 'NV Giao Dịch',
          mhrCode: 'CTV059790',
          role: 'User',
        },
        {
          userName: 'nguyenthiphuong',
          password: 'CTV044030',
          position: 'Thu Cước',
          phone: '0917138132',
          name: 'Nguyễn Thị Phượng',
          positionWork: '',
          mhrCode: 'CTV044030',
          role: 'User',
        },
        {
          userName: 'nguyenthihongthom',
          password: 'CTV044027',
          position: 'Thu Cước',
          phone: '02703509231',
          name: 'Nguyễn Thị Hồng Thơm',
          positionWork: '',
          mhrCode: 'CTV044027',
          role: 'User',
        },
        {
          userName: 'leminhhieu',
          password: 'CTV044044',
          position: 'Thu Cước',
          phone: '0889307939',
          name: 'Lê Minh Hiếu',
          positionWork: '',
          mhrCode: 'CTV044044',
          role: 'User',
        },
        {
          userName: 'nguyenhuuvinh',
          password: 'CTV067875',
          position: 'Thu Cước',
          phone: '0939802959',
          name: 'Huỳnh Hữu Vinh',
          positionWork: '',
          mhrCode: 'CTV067875',
          role: 'User',
        },
      ];

      const userPromises = users.map(userData => insertUser(tx, userData));

      Promise.all([userPromises])
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};

const insertUser = (
  tx: SQLite.Transaction,
  userData: {
    userName: any;
    password: any;
    position: any;
    phone: any;
    name: any;
    positionWork: string;
    mhrCode: string;
    role: string;
  },
) => {
  return new Promise((resolve, reject) => {
    tx.executeSql(
      `INSERT INTO ${TABLE_USER} (userName, password, position, phone, name, positionWork,mhrCode,role) VALUES (?, ?, ?, ?, ?,?,?,?)`,
      [
        userData.userName,
        userData.password,
        userData.position,
        userData.phone,
        userData.name,
        userData.positionWork,
        userData.mhrCode,
        userData.role,
      ],
      (_: any, {insertId}: any) => {
        resolve(insertId);
      },
      (_: any, error: any) => {
        reject(error);
      },
    );
  });
};

export const insertInitialCategoryData = (
  db: SQLiteDatabase,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      const categories = ['Sim Di Động'];
      const categoryPromises = categories.map(categoryName =>
        insertCategory(tx, categoryName),
      );

      Promise.all([categoryPromises])
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};

const insertCategory = (tx: SQLite.Transaction, categoryName: string) => {
  return new Promise((resolve, reject) => {
    tx.executeSql(
      `INSERT INTO ${TABLE_CATEGORY} (name) VALUES (?)`,
      [categoryName],
      (_: any, {insertId}: any) => {
        resolve(insertId);
      },
      (_: any, error: any) => {
        reject(error);
      },
    );
  });
};
export {initDatabase, createTables};
