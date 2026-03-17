// Mock para fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});
