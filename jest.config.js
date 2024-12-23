/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  /* transform: {
    "^.+\\.ts$": "ts-jest",
  }, */
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@tests/(.*)": "<rootDir>/tests/$1",
  },
  testMatch: ["<rootDir>/tests/**/*.(test|spec).ts"],
};
