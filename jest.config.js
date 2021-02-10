module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  testEnvironment: 'node',
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // "text-summary"
  modulePathIgnorePatterns: [
    // 'task1/__tests__/unit.test1.ts',
    // 'task1/__tests__/integration.test.ts',
    'task2/__tests__/unit.test2.ts',
    'task2/__tests__/integration.test.ts',
    'task3/__tests__/unit.test3.ts',
    'task3/__tests__/integration.test.ts',
    'task4/__tests__/unit.test4.ts',
    'task4/__tests__/integration.test.ts'
  ]
};
