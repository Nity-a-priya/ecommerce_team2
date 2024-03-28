import {useEffect, useState} from 'react';
import CartModel from '../../Model/CartModel';
import {getAllCartListItems} from '../../Utils/Database/CartDB';

const useCartList = (itemdata: CartModel) => {
  const [isProductAdded, setProductAdded] = useState(false);

  useEffect(() => {
    const getCartList = async () => {
      const allcartItems = await getAllCartListItems();
      const itemInWishlist = allcartItems.some(item => item.id === itemdata.id);
      setProductAdded(itemInWishlist);
      console.log(itemInWishlist);
    };
    getCartList();
  }, [itemdata.id]);

  return {isProductAdded, setProductAdded};
};

export default useCartList;
