import config from '../../../playwright.config';
import path from 'path';

export function loadJsonFile(filename: string): any {
  return require(path.resolve(config.testDataDir, filename));
}

export const AUTH_REQUEST_JSON_BODY = loadJsonFile('auth-request.json');

export const GET_BOOKS_REQUEST_JSON_BODY = loadJsonFile('books-list-request.json');

export const ADD_BOOK_REQUEST_JSON_BODY = loadJsonFile('add-book-request.json');

export const GET_BOOKS_FOR_USER_REQUEST_JSON_BODY = loadJsonFile('get-booksForUser-request.json');

export const DELETE_BOOK_FOR_USER_REQUEST_JSON_BODY = loadJsonFile('delete-book-request.json');

const testdata = loadJsonFile('common-config.json');

export const USERNAME = testdata.userName;

export const PASSWORD = testdata.password;

export const USERID = testdata.userId;
