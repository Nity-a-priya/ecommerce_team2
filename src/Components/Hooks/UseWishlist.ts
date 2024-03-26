import {useEffect, useState} from 'react';
import ProductModel from '../../Model/ProductModel';
import { connectToDatabase } from '../../Utils/SQLiteDB';
import {
  addWishlistItem,
  getAllWishListItems,
  removeFromWishlist,
} from '../../Utils/UserWishList';

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<ProductModel[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      const db = await connectToDatabase();
      const allItems = await getAllWishListItems(db);
      setWishlist(allItems);
    }
    fetchWishlist();
  }, [wishlist]);

  const favouritesHandler = async (itemdata: ProductModel) => {
    const db = await connectToDatabase();
    const itemInWishlist = wishlist.some(item => item.id === itemdata.id);
    if (itemInWishlist) {
      await removeFromWishlist(db, itemdata);
    } else {
      await addWishlistItem(db, itemdata);
    }
    // After adding or removing from wishlist, update the wishlist state
    const updatedWishlist = await getAllWishListItems(db);
    setWishlist(updatedWishlist);
  };

  return {wishlist, favouritesHandler};
};

export default useWishlist;
