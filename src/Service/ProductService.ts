import ProductModel from '../Model/ProductModel';

class ProductService {
  async fetchProduct(): Promise<ProductModel[]> {
    const url = 'https://fakestoreapi.com/products';
    const response = await fetch(url);
    const result: ProductModel[] = await response.json();
    return result;
  }
}

export default ProductService;
