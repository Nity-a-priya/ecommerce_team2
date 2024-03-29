import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import ProductModel from '../../Model/ProductModel';
import {
  addWishlistItem,
  getAllWishListItems,
  removeFromWishlist,
  removeTable,
} from '../../Utils/Database/WishListDB';

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<ProductModel[]>([]);
  const isfocused = useIsFocused();

  async function fetchWishlist() {
    const allItems = await getAllWishListItems();
    setWishlist(allItems);
  }

  useEffect(() => {
    fetchWishlist();
  }, [isfocused]);

  const favouritesHandler = async (itemdata: ProductModel) => {
    const itemInWishlist = wishlist.some(item => item.id === itemdata.id);
    if (itemInWishlist) {
      await removeFromWishlist(itemdata);
    } else {
      await addWishlistItem(itemdata);
    }

    // After adding or removing from wishlist, update the wishlist state
    const updatedWishlist = await getAllWishListItems();
    setWishlist(updatedWishlist);
  };

  async function deleteWishList() {
    await removeTable();

    const updatedWishlist = await getAllWishListItems();
    setWishlist(updatedWishlist);
  }

  return {wishlist, favouritesHandler, deleteWishList};
};

export default useWishlist;
