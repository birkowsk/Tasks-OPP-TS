import { v4 as uuid } from 'uuid';
import { isStringIsEmpty } from './validation';
import { validateEmail } from './utils';

type keyValues = 'name' | 'surname' | 'email';

interface IContact {
  id: string;
  date: Date;
  name: string;
  surname: string;
  email: string;
  readData(): Object;
  update(key: string, value: string): void;
  contains(phrase: string): boolean;
}

class Contact implements IContact {
  public id: string;
  public date: Date;
  public name: string;
  public surname: string;
  public email: string;

  constructor(name: string, surname: string, email: string) {
    isStringIsEmpty(name);
    isStringIsEmpty(surname);
    validateEmail(email);
    this.id = uuid();
    this.date = new Date();
    this.name = name;
    this.surname = surname;
    this.email = email;
  }

  readData(): Object {
    return {
      id: this.id,
      date: this.date.toString(),
      name: this.name.toLowerCase(),
      surname: this.surname.toLowerCase(),
      email: this.email
    };
  }

  update(key: keyValues, value: string): void {
    const smallKey = key.toLowerCase();
    if (smallKey === 'email') {
      validateEmail(value);
    }
    isStringIsEmpty(value);
    this[smallKey] = value;
  }

  contains(phrase: string): boolean {
    isStringIsEmpty(phrase);
    const allValues = Object.values(this.readData());
    const lowerPhrase = phrase.toLowerCase();

    return allValues.some((el) => el.toLowerCase().includes(lowerPhrase));
  }
}

export { Contact, IContact };
