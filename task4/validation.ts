function isStringIsEmpty(input: string): void {
  const isNotEmpty = input.length !== 0;

  if (!isNotEmpty) {
    throw new Error(`String cannot be empty`);
  }
}

export { isStringIsEmpty };
