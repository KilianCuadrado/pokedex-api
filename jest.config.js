module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.js", "**/?(*.)+(spec|test).js"],
  collectCoverageFrom: [
    "js/**/*.js",
    "!js/data/**"
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  moduleFileExtensions: ["js"],
  transformIgnorePatterns: ["node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
