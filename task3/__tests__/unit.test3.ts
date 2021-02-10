import { validateBirthday, validatePassword, isUserExistInAppList, validateEmail } from '../utils';
import isStringIsEmpty from '../validation';
import { User } from '../User';
import App from '../App';

// const user1 = new User('Adam', 'Zawadzki', '22.12.2012', 'Kami2dd!!', 'female', 'abacki@gmail.com', 'USER');
// const user2 = new User('Jan', 'Nowak', '22.12.2012', 'Kami2dd!!', 'female', 'abacki@gmail.com', 'USER');
// const superUser1 = new User('Ewa', 'Farna', '20/10/2019', 'Ewa123123!', 'female', 'ewa@farna.com', 'ADMIN');
// const superUser2 = new User('Artur', 'Bas', '20/10/2019', 'Ewa123123!', 'female', 'ewa@farna.com', 'ADMIN');
// const superUser3 = new User('Kamil', 'Kalin', '20/10/2019', 'Ewa123123!', 'female', 'ewa@farna.com', 'USER');
// const App1 = new App();

describe('utils functions shows error', () => {
  const user1 = new User('Adam', 'Zawadzki', '22.12.2012', 'Kami2dd!!', 'female', 'abacki@gmail.com', 'USER');
  const superUser1 = new User('Ewa', 'Farna', '20/10/2019', 'Ewa123123!', 'female', 'ewa@farna.com', 'ADMIN');
  const App1 = new App();
  test('if validatePassword function throws Error', () => {
    const testArray = ['Pass1!', 'Pssword11', 'password1!', 'Password!'];

    testArray.forEach((password) => {
      try {
        validatePassword(password);
      } catch (err) {
        expect(err.message).toBe('Password should contain min 8 signs, 1 big letter, one number and one special sign');
      }
    });
  });

  test('if validateBirthday function throws error', () => {
    const testArray = ['1995/10/15', '10.15.1990', '1,11,2000', '20-20-2001'];

    testArray.forEach((birthday) => {
      try {
        validatePassword(birthday);
      } catch (err) {
        expect(err.message).toBe('Password should contain min 8 signs, 1 big letter, one number and one special sign');
      }
    });
  });

  test('if validateEmail throws error', () => {
    const testEmailArray = ['sadasd@.pl', 'dadad.pl', 'aromatycznePrzyprawy'];
    testEmailArray.forEach((email) => {
      try {
        validateEmail(email);
      } catch (err) {
        expect(err.message).toBe(`Email shoud be email@test.com`);
      }
    });
  });
  test('if isUserExistInAppList function returns false', () => {
    expect(isUserExistInAppList(user1, App1.users)).toBe(false);
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

describe('App functions shows error', () => {
  const user1 = new User('Adam', 'Zawadzki', '22.12.2012', 'Kami2dd!!', 'female', 'abacki@gmail.com', 'USER');
  const superUser1 = new User('Ewa', 'Farna', '20/10/2019', 'Ewa123123!', 'female', 'ewa@farna.com', 'ADMIN');
  const superUser2 = new User('Artur', 'Bas', '20/10/2019', 'Ewa123123!', 'female', 'ewa@farna.com', 'ADMIN');
  const user3 = new User('Kamil', 'Kalin', '20/10/2019', 'Ewa123123!', 'female', 'ewa@farna.com', 'USER');
  const user2 = new User('Jan', 'Nowak', '22.12.2012', 'Kami2dd!!', 'female', 'abacki@gmail.com', 'USER');
  const App1 = new App();

  test('when user already exist in user list', () => {
    try {
      App1.addUserToApp(user1);
    } catch (err) {
      expect(err.message).toBe(`${user1} already exist in users list`);
    }
  });

  test('when user does not exist in App', () => {
    try {
      App1.changeUserAccessLevel(superUser1, user2, 'ADMIN');
    } catch (err) {
      expect(err.message).toBe(`${user2} does not exist in users list`);
    }
  });

  test('when super user does not exist in App', () => {
    try {
      App1.changeUserAccessLevel(superUser2, user1, 'ADMIN');
    } catch (err) {
      expect(err.message).toBe(`${superUser2} does not exist in users list`);
    }
  });

  test('when user doesn`t have admin level', () => {
    try {
      App1.addUserToApp(user3);
      App1.changeUserAccessLevel(user3, user1, 'ADMIN');
    } catch (err) {
      expect(err.message).toBe(`SuperUser has to be ADMIN level`);
    }
  });

  test('when super user doesn`t have admin level', () => {
    App1.addUserToApp(superUser1);
    const newAccessLevel = 'ADMIN';
    try {
      App1.changeUserAccessLevel(superUser1, user1, newAccessLevel);
    } catch (err) {
      expect(err.message).toBe(`This User has already accessLevel: ${newAccessLevel}`);
    }
  });

  test('when password is the same as old one', () => {
    try {
      App1.changeUserPassword(superUser1, user1, 'Kami2dd!!');
    } catch (err) {
      expect(err.message).toBe('New password cannot be the same as old password');
    }
  });
});

describe('App functions works correctly', () => {
  const user1 = new User('Adam', 'Zawadzki', '22.12.2012', 'Kami2dd!!', 'female', 'abacki@gmail.com', 'USER');
  const superUser1 = new User('Ewa', 'Farna', '20/10/2019', 'Ewa123123!', 'female', 'ewa@farna.com', 'ADMIN');
  const App1 = new App();

  test('if user was added to app', () => {
    App1.addUserToApp(user1);
    expect(App1.users).toEqual([user1]);
  });
  test('if user access level was changed', () => {
    App1.addUserToApp(superUser1);
    App1.changeUserAccessLevel(superUser1, user1, 'ADMIN');
    expect(user1.accessLevel).toEqual('ADMIN');
  });
});
