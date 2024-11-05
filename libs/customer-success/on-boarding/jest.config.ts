export default {
displayName: 'customer-success-backend/on-boarding',
preset: '../../../jest.preset.js',
testEnvironment: 'node',
transform: {
'^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/contexts/customer-success-backend',
  };
