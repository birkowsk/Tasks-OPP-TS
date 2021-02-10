import { Product } from '../Product';
import { isElementNotExistInArray, findWrapperFunction } from '../utils';
import { isStringIsEmpty, isPositiveNumber, isPositiveNumberAndInRange } from '../validation';
import Cart from '../Cart';

// const product1 = new Product('Pudliszki', 100, 'Ketohup');
// const product2 = new Product('Folia aluminiowa', 20, 'Jan Niezbędny');
// const backet = new Cart();

describe('utils functions works correctly', () => {
  const product1 = new Product('Pudliszki', 100, 'Ketohup');

  const key = 'LALA';
  const key1 = 'nie ma';
  const testedArray = ['lala', 'Kopara', 'Cwiara'];

  test('if isElementExistInArray returns boolean', () => {
    expect(isElementNotExistInArray(key, testedArray)).toBe(false);
    expect(isElementNotExistInArray(key1, testedArray)).toBe(true);
  });

  test('if findWrapperFunction return idnex of element', () => {
    const testArray2 = [product1];

    const findMyProduct = findWrapperFunction(product1);
    const foundIndex = testArray2.findIndex(findMyProduct);

    expect(foundIndex).toBe(0);
  });
});

describe('validation functions shows error', () => {
  test('when string is empty', () => {
    try {
      isStringIsEmpty('');
    } catch (err) {
      expect(err.message).toBe(`String cannot be empty`);
    }
  });

  test('when number is nan or not positive', () => {
    const valuesArray = [-5, 2, 3, NaN];

    valuesArray.forEach((value) => {
      try {
        isPositiveNumber(value);
      } catch (err) {
        expect(err.message).toBe(`Value should be positive number and not be NaN`);
      }
    });
  });

  test('when number is not positive, NaN or out of range', () => {
    const testArray = [-20, NaN, 101];

    testArray.forEach((value) => {
      try {
        isPositiveNumberAndInRange(value);
      } catch (err) {
        expect(err.message).toBe('Value should be positive number in range from 1 to 100');
      }
    });
  });
});

describe('product functions works correctly', () => {
  const product1 = new Product('Pudliszki', 100, 'Ketohup');

  test('if disscount was added to product', () => {
    const discount10 = 10;
    const discount90 = 90;
    product1.addDiscount(discount10);
    expect(product1.discount).toBe(discount10);
    expect(product1.discountedPrice).toBe(discount90);
  });

  test('if category was added to product', () => {
    product1.addCategory('pomidor');
    expect(product1.categories).toEqual(['Ketohup', 'pomidor']);
  });

  test('if category was removed', () => {
    product1.removeCategory('pomidor');
    expect(product1.categories).toEqual(['Ketohup']);
  });

  test('if update function updated a product', () => {
    product1.update('name', 'Heinz');
    expect(product1.name).toEqual('Heinz');
  });
});

describe('product function shows error', () => {
  const product1 = new Product('Pudliszki', 100, 'Ketohup');

  test('if update function parameters have wrong value', () => {
    try {
      product1.update('name', NaN);
    } catch (err) {
      expect(err.message).toBe('Product cannot be updated');
    }
  });
});

describe('cart functions shows error', () => {
  const product2 = new Product('Folia aluminiowa', 20, 'Jan Niezbędny');
  const backet = new Cart();

  test('when item to be removed from cart does not exist', () => {
    try {
      backet.deleteFromCart(product2);
    } catch (err) {
      expect(err.message).toBe('Product does not exist in cart');
    }
  });

  test('when discound code does not exist', () => {
    try {
      backet.addDiscountCode('nike40');
    } catch (err) {
      expect(err.message).toBe('Code does not exist');
    }
  });
});

describe('cart functions works correctly', () => {
  const product1 = new Product('Pudliszki', 100, 'Ketohup');
  const backet = new Cart();

  test('if product was added to cart', () => {
    backet.addProduct(product1);
    expect(backet.items).toEqual([product1]);
  });

  test('if product was deleted from cart', () => {
    backet.deleteFromCart(product1);
    expect(backet.items).toEqual([]);
  });

  test('if discount was added to cart', () => {
    backet.addProduct(product1);
    backet.addDiscountCode('nike10');
    expect(backet.selectedCode).toEqual('nike10');
  });

  test('if cart sum was sumaried', () => {
    backet.sumCart();
    expect(backet.sum).toEqual({ price: 90, quantity: 1 });
  });
});
