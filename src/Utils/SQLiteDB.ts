import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import Product from '../Model/ProductModel';

// Enable promise for SQLite
enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'ecommerce_team2.db', location: 'default'},
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const userWishlistQuery = `
      CREATE TABLE IF NOT EXISTS UserWishlist (
          id INTEGER DEFAULT 1,
          title TEXT,
          price INTEGER,
          description TEXT,
          category TEXT,
          image TEXT,
          rate INTEGER,
          count INTEGER,
          PRIMARY KEY(id)
      )
    `;
  try {
    await db.executeSql(userWishlistQuery);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
};

export const addWishlistItem = async (db: SQLiteDatabase, product: Product) => {
  const insertQuery = `
     INSERT INTO UserWishlist (id, title, price, description, category, image, rate, count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
   `;
  const values = [
    product.id,
    product.title,
    product.price,
    product.description,
    product.category,
    product.image,
    product.rating.rate,
    product.rating.count,
  ];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add wishlist');
  }
};

export const getAllWishListItems = async (
  db: SQLiteDatabase,
): Promise<Product[]> => {
  try {
    const wishlist: Product[] = [];
    const results = await db.executeSql('SELECT * FROM UserWishlist');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const row = result.rows.item(index);
        const product: Product = {
          id: row.id,
          title: row.title,
          price: row.price,
          description: row.description,
          category: row.category,
          image: row.image,
          rating: {
            rate: row.rate,
            count: row.count,
          },
        };
        wishlist.push(product);
      }
    });
    return wishlist;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get wishlist from database');
  }
};

// {
//   "category": "men's clothing",
//   "count": 259,
//   "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
//   "id": 2,
//   "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//   "price": 22.3,
//   "rate": 4.1,
//   "title": "Mens Casual Premium Slim Fit T-Shirts "
// }

export const getSpecificItem = async (db: SQLiteDatabase, product: Product) => {
  const query = `SELECT * FROM UserWishlist WHERE id = ${product.id}`;
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

type Table = 'UserWishlist';

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DELETE FROM ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};

export const removeFromWishlist = async (
  db: SQLiteDatabase,
  product: Product,
) => {
  const deleteQuery = `
      DELETE FROM UserWishlist
      WHERE id = ?
    `;
  const values = [product.id];
  try {
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove product');
  }
};
