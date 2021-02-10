import { v4 as uuid } from 'uuid';
import { isStringIsEmpty } from './validation';
import { isElementNotExistInArray, findWrapperFunction } from './utils';
import { Product, IProduct } from './Product';

type sumType = {
  price: number;
  quantity: number;
};

interface ICart {
  id: string;
  items: IProduct[];
  discountCodes: string[];
  selectedCode: string;
  sum: sumType;
  addProduct(product: IProduct): string;
  deleteFromCart(product: IProduct): string;
  sumCart(): string;
}

class Cart implements ICart {
  public id: string;
  public items: IProduct[];
  public discountCodes: string[];
  public selectedCode: string;
  public sum: sumType;
  constructor() {
    this.id = uuid();
    this.items = [];
    this.discountCodes = ['nike10', 'nike20'];
    this.selectedCode = '';
    this.sum = { price: 0, quantity: 0 };
  }

  addProduct(product: IProduct): string {
    const findMyProduct = findWrapperFunction(product);

    const foundIndex = this.items.findIndex(findMyProduct);

    if (foundIndex !== -1) {
      const foundItem = this.items[foundIndex];
      foundItem.quantity += 1;
    } else {
      this.items.push(product);
    }
    return `Product ${product.id} was updated`;
  }

  deleteFromCart(product: IProduct): string {
    const isItemSameProduct = findWrapperFunction(product); // factory

    const itemIndexToRemove = this.items.findIndex(isItemSameProduct);
    if (itemIndexToRemove === -1) {
      throw new Error('Product does not exist in cart');
    }

    this.items.splice(itemIndexToRemove, 1);
    return `Product ${product.id} was deleted`;
  }

  addDiscountCode(code: string): void {
    isStringIsEmpty(code);

    if (isElementNotExistInArray(code, this.discountCodes)) {
      throw new Error('Code does not exist');
    }
    this.selectedCode = code;
  }

  sumCart(): string {
    const totals = this.items.reduce(
      function (accumulator, { discountedPrice, quantity }) {
        accumulator.price += discountedPrice;
        accumulator.quantity += quantity;
        return accumulator;
      },
      { price: 0, quantity: 0 }
    );

    if (this.selectedCode !== '') {
      const codeNumbers = /\d{2}$/;
      const getCodeNumbers = this.selectedCode.match(codeNumbers);

      if (getCodeNumbers === null) {
        throw new Error('code numbers can not be null');
      }

      const [discountCode] = getCodeNumbers;

      const priceWithDiscount = totals.price - (totals.price * Number(discountCode)) / 100;
      totals.price = priceWithDiscount;
      this.sum = totals;
      return `Cart was updated`;
    }

    this.sum = totals;
    return `Cart was updated`;
  }
}

export default Cart;
