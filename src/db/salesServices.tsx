import {ISALES, IUSERCURRENTSALE} from '../common/common';
import {IInputSales} from '../screen/InputSale/InputSales';
import {openDatabase} from './initDatabase';

export const insertOrUpdateByUserId = async (data: IInputSales) => {
  const db = await openDatabase();
  const {userId, createdAt, categoryId} = data;

  // Check if a sale entry with the given user ID, createdAt, and categoryId exists
  const existingSale = await db.executeSql(
    'SELECT * FROM sales WHERE userId = ? AND createdAt = ? AND categoryId = ?',
    [userId, createdAt, categoryId],
  );

  if (existingSale[0].rows.length > 0) {
    // Sale entry exists, perform update
    await db.executeSql(
      'UPDATE sales SET deliveryQuantity = ?, note = ?, realQuantity = ?, revenue = ?, updatedAt = ? WHERE userId = ? AND createdAt = ? AND categoryId = ?',
      [
        data.deliveryQuantity,
        data.note,
        data.realQuantity,
        data.revenue,
        data.updatedAt,
        userId,
        createdAt,
        categoryId,
      ],
    );
    console.log('Sale entry updated successfully');

    // Retrieve the updated sale entry
    const updatedSale = await db.executeSql(
      'SELECT * FROM sales WHERE userId = ? AND createdAt = ? AND categoryId = ?',
      [userId, createdAt, categoryId],
    );

    if (updatedSale[0].rows.length > 0) {
      const updatedSaleEntry: ISALES = updatedSale[0].rows.item(0);
      return updatedSaleEntry; // Return the updated sale entry object
    }
  } else {
    // Sale entry does not exist, perform insert
    await db.executeSql(
      'INSERT INTO sales (userId, createdAt, categoryId, deliveryQuantity, note, realQuantity, revenue, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        userId,
        createdAt,
        categoryId,
        data.deliveryQuantity,
        data.note,
        data.realQuantity,
        data.revenue,
        data.updatedAt,
      ],
    );
    console.log('New sale entry created successfully');

    // Retrieve the created sale entry
    const createdSale = await db.executeSql(
      'SELECT * FROM sales WHERE userId = ? AND createdAt = ? AND categoryId = ?',
      [userId, createdAt, categoryId],
    );

    if (createdSale[0].rows.length > 0) {
      const createdSaleEntry: ISALES = createdSale[0].rows.item(0);
      return createdSaleEntry; // Return the created sale entry object
    }
  }

  return null; // Return null if the operation was not successful
};

export const getSalesByUserId = async (
  payload: IUSERCURRENTSALE,
): Promise<ISALES | null> => {
  const db = await openDatabase();
  const {userId, createdAt, categoryId} = payload;
  const sales = await db.executeSql(
    `SELECT s.*, c.name AS categoryName, u.name AS userName
    FROM sales AS s
    JOIN category AS c ON s.categoryId = c.id
    JOIN user AS u ON s.userId = u.id
    WHERE s.userId = ? AND s.createdAt = ? AND s.categoryId = ?`,
    [userId, createdAt, categoryId],
  );
  const existingSale = await db.executeSql('SELECT * FROM sales ', []);
  console.log(payload);
  console.log('existingSale', existingSale[0].rows.item(0));
  if (sales[0].rows.length > 0) {
    return sales[0].rows.item(0);
  }
  return null;
};
