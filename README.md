# Playwright Sample API Testing Scenario Demo

[![Playwright API Tests for Book Operations](https://github.com/manishjain1610/API-Testing-Bookstore--using-Playwright/actions/workflows/playwright-ci.yml/badge.svg)](https://github.com/manishjain1610/API-Testing-Bookstore--using-Playwright/actions/workflows/playwright-ci.yml)

This repository contains a Playwright API test written in TypeScript and is configured to run tests in different environments such as QA and Production. This is meant to showcase Playwright API testing for https://bookstore.toolsqa.com/swagger/ with various API calls.
The suite tests following operations -
1. [POST] Authorize a user.
2. [GET] Get the list of books.
3. [GET] Get details of first book from list.
4. [POST] Add the book to user account.
5. [GET] Check the books under user account.
6. [DELETE] Remove the book from  user account.

## Table of Contents

- [Installation](#installation)
  - [Install Node.js and npm](#install-nodejs-and-npm)
  - [Install Playwright](#install-playwright)
  - [Install Visual Studio Code](#install-visual-studio-code)
  - [Install Project Dependencies](#install-project-dependencies)
- [Project Structure](#project-structure)
  - [Configuration Files](#configuration)
- [Running Tests](#running-tests)
  - [Running Tests in Different Environments](#running-tests-in-different-environments)
- [Best Practices Used](#best-practices-used)

## Installation

### Install Node.js and npm

1. **Download and Install Node.js**: Visit [nodejs.org](https://nodejs.org/) and download the LTS version of Node.js. The npm package manager is included with Node.js.

2. **Verify Installation**: After installing Node.js, you can verify the installation by running the following commands in your terminal:

   ```bash
   node -v
   npm -v
   ```

### Install Playwright

1. **Install Playwright**: Run the following command to install Playwright and its dependencies:

   ```bash
   npm install @playwright/test
   ```

2. **Install Browsers**: Run the following command to install the required browsers:

   ```bash
   npx playwright install
   ```

### Install Visual Studio Code

1. **Download and Install VSCode**: Visit [code.visualstudio.com](https://code.visualstudio.com/) and download the latest version of Visual Studio Code.

### Install Project Dependencies

1. **Clone the Repository**: Clone this repository to your local machine:

   ```bash
   git clone https://github.com/manishjain1610/API Testing(Bookstore) using Playwright.git
   ```

2. **Install Dependencies**: Navigate to the project directory and run the following command to install the project dependencies:

   ```bash
   npm install
   ```

## Project Structure

```plaintext
API Testing(Bookstore) using Playwright/
├── node_modules/
├── playwright-report/
├── src/
│   └── test/
│      ├── constants/
│      │   └── api-request-constant.ts
│      ├── fixtures/
│      │   └── api-fixture.ts
│      ├── resources/
│      │   ├── prod/
│      │   │   └── add-book-request.json
│      │   │   └── auth-request.json
│      │   │   └── books-list-request.json
│      │   │   └── common-config.json
│      │   │   └── delete-book-request.json
│      │   │   └── get-booksForUser-request.json
│      │   └── qa/
│      │   │   └── add-book-request.json
│      │   │   └── auth-request.json
│      │   │   └── books-list-request.json
│      │   │   └── common-config.json
│      │   │   └── delete-book-request.json
│      │   │   └── get-booksForUser-request.json
│      ├── utils/
│      │   ├── api-clients.ts
│      │   └── create-request.ts
│      ├── auth.spec.ts
│      └── bookAddRemove.spec.ts
├── test-results/
├── .gitignore
|── .prettierrc
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```

### Configuration

- **package.json**: Defines the scripts and dependencies for the project.
- **playwright.config.ts**: Configuration file for Playwright tests.

## Running Tests

### Running Tests in Different Environments

- **QA Environment**:

  ```bash
  npm run test-qa
  ```

- **Production Environment**:

  ```bash
  npm run test-prod
  ```

## Best Practices Used

- **Modular and Scalable:** The configuration setup allows for easy addition of new environments and modifications to existing configurations as the project evolves.
- **Multiple Environment Support:** Supports QA and PROD environments with separate test data.
- **Flexibility:** Testers can seamlessly switch between environments without altering test scripts, improving productivity and efficiency during testing cycles.
