import CartModel from '../../Model/CartModel';
import {connectToDatabase} from './SQLiteDB';

export const addCartlistItem = async (cart: CartModel) => {
  const insertQuery = `
     INSERT INTO UserCartlist (id, title, price, image, quantity)
     VALUES (?, ?, ?, ?, ?)
   `;
  const values = [cart.id, cart.title, cart.price, cart.image, cart.quantity];
  try {
    const db = await connectToDatabase();
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add cartlist');
  }
};

export const getAllCartListItems = async (): Promise<CartModel[]> => {
  try {
    const cartlist: CartModel[] = [];
    const db = await connectToDatabase();
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
    const db = await connectToDatabase();
    return db.executeSql(updateQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update cart item quantity');
  }
};

export const getSpecificItem = async (cart: CartModel) => {
  const query = `SELECT * FROM UserCartlist WHERE id = ${cart.id}`;
  try {
    const db = await connectToDatabase();
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

export const removeTable = async (tableName: Table) => {
  const query = `DELETE FROM ${tableName}`;
  try {
    const db = await connectToDatabase();
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};

export const removeFromCartlist = async (cart: CartModel) => {
  const deleteQuery = `
      DELETE FROM UserCartlist
      WHERE id = ?
    `;
  const values = [cart.id];
  try {
    const db = await connectToDatabase();
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove cart');
  }
};
