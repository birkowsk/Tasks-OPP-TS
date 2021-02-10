import { removeElementFromArray, isElementExistInArray, validateEmail } from '../utils';
import { isStringIsEmpty } from '../validation';
import { Contact } from '../Contact';
import { ContactGroup } from '../ContactGroup';
import AddressBook from '../AddressBook';

// const contact1 = new Contact('Janek', 'Nowak', 'pawel@gmail.com');
// const contact2 = new Contact('Marian', 'Janusz', 'Marian@gmail.com');
// const contact3 = new Contact('Aasa', 'Jasinska', 'Marian@gmail.com');
// const contact4 = new Contact('Xasarian', 'Daniński', 'Marian@gmail.com');
// const contact5 = new Contact('MEW', 'Mariniński', 'Marian@gmail.com');
// const group1 = new ContactGroup('grupa1');
// const group2 = new ContactGroup('grupa2');
// const addressBook1 = new AddressBook('ksiazka');

describe('utils functions shows error', () => {
  const contact1 = new Contact('Janek', 'Nowak', 'pawel@gmail.com');
  const group1 = new ContactGroup('grupa1');
  test('if validateEmail throws error', () => {
    const testEmailArray = ['sadasd@.pl', 'dadad.pl', 'aromatycznePrzyprawy'];
    testEmailArray.forEach((email) => {
      try {
        validateEmail(email);
      } catch (err) {
        expect(err.message).toBe(`Wrong type of email, should be something@something.com`);
      }
    });
  });

  test('if isElementExistInArray returns boolean', () => {
    expect(isElementExistInArray(contact1, group1.contacts)).toBe(false);
  });

  test('if removeElementFromArray function throws error when element does not exist in array', () => {
    try {
      removeElementFromArray([{ id: '1' }, { id: '2' }], { id: '3' });
    } catch (err) {
      expect(err.message).toBe('ElementToRemove does not exist in array, so you can not delete it');
    }
  });

  test('if removeElementFromArray function removes element from array', () => {
    const testedArray = [{ id: '1' }, { id: '2' }];
    const testedObject = { id: '2' };
    removeElementFromArray(testedArray, testedObject);
    expect(testedArray).toEqual([{ id: '1' }]);
  });
});

describe('validation function shows error', () => {
  test('when string is empty', () => {
    try {
      isStringIsEmpty('');
    } catch (err) {
      expect(err.message).toBe(`String cannot be empty`);
    }
  });
});

describe('contact functions works correctly', () => {
  const contact1 = new Contact('Janek', 'Nowak', 'pawel@gmail.com');
  const contact2 = new Contact('Marian', 'Janusz', 'Marian@gmail.com');

  test('if update function update values', () => {
    contact1.update('name', 'Jan');
    contact1.update('surname', 'Nowak');
    contact1.update('email', 'JanNowak@wp.pl');

    expect(contact1.name).toBe('Jan');
    expect(contact1.surname).toBe('Nowak');
    expect(contact1.email).toBe('JanNowak@wp.pl');
  });

  test('if contains return boolean', () => {
    expect(contact1.contains('Ja')).toBe(true);
    expect(contact1.contains('dad')).toBe(false);
    expect(contact2.contains('Maria')).toBe(true);
  });
});

describe('ContactGroup functions works correctly', () => {
  const contact1 = new Contact('Janek', 'Nowak', 'pawel@gmail.com');
  const group1 = new ContactGroup('grupa1');

  test('if addContact was added contact to contacts list', () => {
    group1.addContact(contact1);
    expect(group1.contacts).toEqual([contact1]);
  });

  test('if removeContact remove contact from contacts list', () => {
    group1.removeContact(contact1);
    expect(group1.contacts).toEqual([]);
  });

  test('if updateGroupName function update a group name', () => {
    group1.updateGroupName('NowaGrupa');
    expect(group1.groupName).toEqual('NowaGrupa');
  });

  test('if isElementContains return boolean', () => {
    group1.addContact(contact1);
    expect(group1.isElementContains('Jan')).toBe(true);
    expect(group1.isElementContains('Nowa')).toBe(true);
    expect(group1.isElementContains('Noffddsfsdwa')).toBe(false);
  });
});

describe('ContactGroup functions shows error', () => {
  const contact1 = new Contact('Janek', 'Nowak', 'pawel@gmail.com');
  const group1 = new ContactGroup('grupa1');

  test('when added contact exist in contact list', () => {
    try {
      group1.addContact(contact1);
    } catch (err) {
      expect(err.message).toBe(`Contact exist so you can not add it`);
    }
  });

  test('when contact does not exist in contact list', () => {
    try {
      group1.removeContact(contact1);
    } catch (err) {
      expect(err.message).toBe('Contact does not exist, so you can not delete it');
    }
  });
});

describe('addressBook functions works correctly', () => {
  const contact1 = new Contact('Janek', 'Nowak', 'pawel@gmail.com');
  const group1 = new ContactGroup('grupa1');
  const addressBook1 = new AddressBook('ksiazka');
  test('if addContact was added contact to list', () => {
    addressBook1.addContact(contact1);
    expect(addressBook1.list).toEqual([contact1]);
  });

  test('if addGroup was added group to groups', () => {
    addressBook1.addGroup(group1);
    expect(addressBook1.groups).toEqual([group1]);
  });

  test('if removeContactFromBook remove contact from address book', () => {
    addressBook1.removeContactFromBook(contact1);
    expect(addressBook1.list).toEqual([]);
    expect(addressBook1.groups[0].contacts).toEqual([]);
  });

  test('if removeContactFromGroup remove contact from group', () => {
    addressBook1.addContact(contact1);
    addressBook1.addContactToGroup(group1, contact1);
    addressBook1.removeContactFromGroup(group1, contact1);
    expect(addressBook1.groups[0].contacts).toEqual([]);
  });

  test('if removeGroup remove group from address book', () => {
    addressBook1.removeGroup(group1);
    expect(addressBook1.groups).toEqual([]);
  });
});

describe('addressBook functions shows error', () => {
  const contact1 = new Contact('Janek', 'Nowak', 'pawel@gmail.com');
  const group1 = new ContactGroup('grupa1');
  const addressBook1 = new AddressBook('ksiazka');
  test('when added contact exist in contact list', () => {
    try {
      addressBook1.addContact(contact1);
    } catch (err) {
      expect(err.message).toBe(`Contact exist so you can not add it`);
    }
  });

  test('when added group exist in groups', () => {
    try {
      addressBook1.addGroup(group1);
    } catch (err) {
      expect(err.message).toBe('Group exist so you can not add it');
    }
  });

  test('when contact does not exist in address book', () => {
    try {
      addressBook1.removeContactFromBook(contact1);
    } catch (err) {
      expect(err.message).toBe('ElementToRemove does not exist in array, so you can not delete it');
    }
  });

  test('when contact does not exist in group', () => {
    try {
      addressBook1.removeContactFromGroup(group1, contact1);
    } catch (err) {
      expect(err.message).toBe('Contact does not exist in group, so you can not delete it');
    }
  });

  test('when group does not exist in address book', () => {
    try {
      addressBook1.removeGroup(group1);
    } catch (err) {
      expect(err.message).toBe('Group does not exist, so you can not delete it');
    }
  });
});
