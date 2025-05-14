/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  // testEnvironment: "jsdom",
  // globals: {
  //   "ts-jest": {
  //     tsconfig: "tsconfig.app.json"
  //   }
  // }
};
