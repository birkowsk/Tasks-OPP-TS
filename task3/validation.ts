import * as isJs from 'is_js';

function isStringIsEmpty(input: string): void {
  if (isJs.empty(input)) {
    throw new Error(`string is empty`);
  }
}

export default isStringIsEmpty;
