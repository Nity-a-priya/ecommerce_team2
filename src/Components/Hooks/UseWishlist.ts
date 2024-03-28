import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import ProductModel from '../../Model/ProductModel';
import {
  addWishlistItem,
  getAllWishListItems,
  removeFromWishlist,
} from '../../Utils/Database/WishListDB';

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<ProductModel[]>([]);
  const isfocused = useIsFocused();

  useEffect(() => {
    async function fetchWishlist() {
      const allItems = await getAllWishListItems();
      setWishlist(allItems);
    }

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

  return {wishlist, favouritesHandler};
};

export default useWishlist;
