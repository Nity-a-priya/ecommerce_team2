// TODO : Name change to camelCase
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import CartModel from '../../Model/CartModel';

export const addCartlistItem = async (db: SQLiteDatabase, cart: CartModel) => {
  const insertQuery = `
     INSERT INTO UserCartlist (id, title, price, image, quantity)
     VALUES (?, ?, ?, ?, ?)
   `;
  const values = [cart.id, cart.title, cart.price, cart.image, cart.quantity];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add cartlist');
  }
};

export const getAllCartListItems = async (
  db: SQLiteDatabase,
): Promise<CartModel[]> => {
  try {
    const cartlist: CartModel[] = [];
    const results = await db.executeSql('SELECT * FROM UserCartlist');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const row = result.rows.item(index);
        cartlist.push(row);
      }
    });
    return cartlist;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get cartlist from database');
  }
};
export const updateCartItemQuantity = async (
  db: SQLiteDatabase,
  cartId: number,
  newQuantity: number,
) => {
  const updateQuery = `
     UPDATE UserCartlist
     SET quantity = ?
     WHERE id = ?
   `;
  const values = [newQuantity, cartId];
  try {
    return db.executeSql(updateQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update cart item quantity');
  }
};

export const getSpecificItem = async (db: SQLiteDatabase, cart: CartModel) => {
  const query = `SELECT * FROM UserCartlist WHERE id = ${cart.id}`;
  try {
    const results = await db.executeSql(query);
    if (results[0]?.rows?.length) {
      return results[0].rows.item(0);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw Error('Failed to get user preferences from database');
  }
};

type Table = 'UserCartlist';

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DELETE FROM ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};

export const removeFromCartlist = async (
  db: SQLiteDatabase,
  cart: CartModel,
) => {
  const deleteQuery = `
      DELETE FROM UserCartlist
      WHERE id = ?
    `;
  const values = [cart.id];
  try {
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove cart');
  }
};
