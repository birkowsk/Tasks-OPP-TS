import * as isJs from 'is_js';

function isStringIsEmpty(input: string): void {
  if (isJs.empty(input)) {
    throw new Error(`String cannot be empty`);
  }
}

export default isStringIsEmpty;
