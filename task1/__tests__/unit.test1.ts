import { Book } from '../Book';
import { Booking } from '../Booking';
import { User } from '../User';
import Library from '../Library';
import { validateEmail, isElementExistInArray } from '../utils';
import { checkIsStringEmpty } from '../validation';
import { convertCompilerOptionsFromJson } from 'typescript';

// const user1 = new User('Adam', 'Abacki', 'adam.abacki@gmail.com');
// const booking1 = new Booking(user1);
// const book1 = new Book('Stasiek Football', 'Krzychu Stan', 'Weszlopolscy');
// const book2 = new Book('Pan Tateusz', 'Adam Mickiewicz', 'Opis');
// const Library1 = new Library('Biblioteka');

describe('validation function shows error', () => {
  test('when string is empty', () => {
    try {
      checkIsStringEmpty('');
    } catch (err) {
      expect(err.message).toBe(`value can not be empty`);
    }
  });
});

describe('utils function shows error', () => {
  test('when email is not correct', () => {
    try {
      validateEmail('niepoprawnyemail');
    } catch (err) {
      expect(err.message).toBe('Wrong type of email, should be something@something.com');
    }
  });
});

describe('utils functions works correctly', () => {
  test('if isElementExistInArray return boolean', () => {
    expect(isElementExistInArray({ id: '1' }, [{ id: '1' }, { id: '2' }])).toBe(true);
  });

  test('if validateEmail return boolean', () => {
    expect(validateEmail('email@gmail.com')).toBe(true);
  });
});

describe('Booking functions shows error', () => {
  const user1 = new User('Adam', 'Abacki', 'adam.abacki@gmail.com');
  const booking1 = new Booking(user1);
  const book1 = new Book('Stasiek Football', 'Krzychu Stan', 'Weszlopolscy');

  booking1.addBook(book1);
  test('when booking is empty', () => {
    try {
      booking1.removeBook(book1);
    } catch (err) {
      expect(err.message).toBe('Book does not exist in booking');
    }
  });
});

describe('Booking functions works correctly', () => {
  const user1 = new User('Adam', 'Abacki', 'adam.abacki@gmail.com');
  const booking1 = new Booking(user1);
  const book1 = new Book('Stasiek Football', 'Krzychu Stan', 'Weszlopolscy');

  test('when book was added to Booking', () => {
    booking1.addBook(book1);
    expect(booking1.rentedBook).toBe(book1);
  });

  test('when book was returned in time', () => {
    booking1.addBook(book1);
    booking1.removeBook(book1);
    expect(booking1.rentedBook).toEqual({});
  });

  test('when book was returned with delay', () => {
    booking1.addBook(book1);

    const getNow = () => new Date(Date.now());
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date('2021-02-11T12:01:58.135Z').valueOf());
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date('2021-02-11T12:01:58.135Z').valueOf());
    const removedBook = booking1.removeBook(book1);
    console.log(booking1.dateOfRent);
    expect(removedBook).toEqual('You have to pay 5');
    expect(booking1.rentedBook).toEqual({});
    expect(getNow()).toEqual(new Date('2021-02-11T12:01:58.135Z'));
  });
});

describe('Library functions shows error', () => {
  const Library1 = new Library('Biblioteka');
  const book2 = new Book('Pan Tateusz', 'Adam Mickiewicz', 'Opis');

  test('if book does not exist in Library', () => {
    try {
      Library1.deleteBookFromLibrary(book2);
    } catch (err) {
      expect(err.message).toBe(`${book2} does not exist, so you can not delete it`);
    }
  });
});

describe('Library functions works correctly', () => {
  const user1 = new User('Adam', 'Abacki', 'adam.abacki@gmail.com');
  const booking1 = new Booking(user1);
  const book1 = new Book('Stasiek Football', 'Krzychu Stan', 'Weszlopolscy');
  const book2 = new Book('Pan Tateusz', 'Adam Mickiewicz', 'Opis');
  const Library1 = new Library('Biblioteka');
  test('if user was added to Library', () => {
    Library1.addUserToLibrary(user1);
    expect(Library1.users).toEqual([user1]);
  });

  test('when book was added to Library', () => {
    Library1.addBookToLibrary(book1);
    expect(Library1.books).toEqual([book1]);
  });

  test('if book was deleted from library', () => {
    Library1.deleteBookFromLibrary(book1);
    expect(Library1.books).toEqual([]);
  });

  test('if book was rented for user', () => {
    Library1.addBookToLibrary(book1);
    Library1.rentBookForUser(user1, book1);
    expect(Library1.books).toEqual([]);
    expect(Library1.rentedBooks).toEqual([book1]);
  });

  test('if book was returned', () => {
    Library1.addBookToLibrary(book2);
    Library1.rentBookForUser(user1, book2);
    Library1.returnBook(book2);
    expect(Library1.books).toEqual([book2]);
    expect(Library1.rentedBooks).toEqual([book1]);
  });
});
