import { devices, PlaywrightTestConfig } from '@playwright/test';

interface TestConfig extends PlaywrightTestConfig {
  authApiUrl: string;
  baseApiUrl: string;
  testDataDir: string;
  bookApiUrl: string;
  booksApiUrl: string;
  userAccountApiUrl: string;
}

const defaultConfig: PlaywrightTestConfig = {
  testDir: './src/test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html']],
  use: {
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
  },
  outputDir: 'test-results',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

const qaConfig: TestConfig = {
  authApiUrl: 'https://bookstore.toolsqa.com/Account/v1/GenerateToken',
  baseApiUrl: 'https://bookstore.toolsqa.com',
  bookApiUrl: 'https://bookstore.toolsqa.com/BookStore/v1/Book',
  booksApiUrl: 'https://bookstore.toolsqa.com/BookStore/v1/Books',
  userAccountApiUrl: 'https://bookstore.toolsqa.com/Account/v1/User/',
  testDataDir: './src/test/resources/qa',
};

const prodConfig: TestConfig = {
  authApiUrl: 'https://bookstore.toolsqa.com/Account/v1/GenerateToken',
  baseApiUrl: 'https://bookstore.toolsqa.com',
  bookApiUrl: 'https://bookstore.toolsqa.com/BookStore/v1/Book',
  booksApiUrl: 'https://bookstore.toolsqa.com/BookStore/v1/Books',
  userAccountApiUrl: 'https://bookstore.toolsqa.com/Account/v1/User/',
  testDataDir: './src/test/resources/prod',
};

// Get the environment from command line. If none, set it to qa
const environment = process.env.TEST_ENV?.trim() || 'qa';

// Config object with default configuration and environment specific configuration
const config: TestConfig = {
  ...defaultConfig,
  ...(environment === 'prod' ? prodConfig : qaConfig),
};

export default config;
