import { expect } from '@playwright/test';
import { fixtures as test } from './fixtures/api-fixture';
import {
  createAddBookRequestFile,
  createGetBooksForUserRequestFile,
  createDeleteBookForUserRequestFile,
} from './utils/create-request';
import {
  AUTH_REQUEST_JSON_BODY,
  GET_BOOKS_REQUEST_JSON_BODY,
  ADD_BOOK_REQUEST_JSON_BODY,
  GET_BOOKS_FOR_USER_REQUEST_JSON_BODY,
  DELETE_BOOK_FOR_USER_REQUEST_JSON_BODY,
  USERNAME,
  PASSWORD,
  USERID,
} from './constants/api-request-constant';

test.describe('Book Add And Remove Test Suite', () => {
  let token: string;
  let isbnFirstBook: string;
  const currentDirectory = __dirname;
  const environment = process.env.TEST_ENV?.trim() || 'qa';
  const addBookRequestFileName = '/add-book-request.json';
  const getBooksForUserRequestFileName = '/get-booksForUser-request.json';
  const deleteBookForUserRequestFileName = '/delete-book-request.json';

  test.beforeAll(async ({ authApiFixture }) => {
    const authResponse = await authApiFixture.post('', AUTH_REQUEST_JSON_BODY);
    expect(authResponse.status()).toBe(200);
    token = (await authResponse.json()).token;
  });

  test('Request list of books, Add first book and then remove it', async ({
    commonApiFixture,
    userApiFixture,
    bookApiFixture,
  }) => {
    // Send API request to get list of books
    const getBookListResponse = await commonApiFixture.get('', GET_BOOKS_REQUEST_JSON_BODY);

    // Response status should be 200
    expect(getBookListResponse.status()).toBe(200);
    const bookListResponseBody = await getBookListResponse.json();

    // Get details of first book from the list
    const firstBook = bookListResponseBody.books[0];
    isbnFirstBook = `${firstBook.isbn}`;

    // Create Add book request
    await createAddBookRequestFile(
      isbnFirstBook,
      currentDirectory + '/resources/' + environment + addBookRequestFileName
    );

    // Add book to the user
    const addBookResponse = await commonApiFixture.post('', ADD_BOOK_REQUEST_JSON_BODY, token);
    // Response status should be 201
    expect(addBookResponse.status()).toBe(201);

    // Create get books under user request
    await createGetBooksForUserRequestFile(
      currentDirectory + '/resources/' + environment + getBooksForUserRequestFileName
    );

    // Get the book added under user
    const getBooksForUserResponse = await userApiFixture.getForUser(
      USERID,
      GET_BOOKS_FOR_USER_REQUEST_JSON_BODY,
      token
    );
    const getBooksForUserResponseBody = await getBooksForUserResponse.json();
    expect(getBooksForUserResponse.status()).toBe(200);
    if (getBooksForUserResponseBody.books.length != 0) {
      expect(JSON.stringify(getBooksForUserResponseBody)).toContain(isbnFirstBook);
    }

    // Create the Delete book for user request
    await createDeleteBookForUserRequestFile(
      isbnFirstBook,
      currentDirectory + '/resources/' + environment + deleteBookForUserRequestFileName
    );

    // Remove the book from user if the list is not empty and there is a book against the user
    if (getBooksForUserResponseBody.books.length != 0) {
      const removeBookResponse = await bookApiFixture.remove(
        '',
        DELETE_BOOK_FOR_USER_REQUEST_JSON_BODY,
        token
      );
      // Response status should be 204
      expect(removeBookResponse.status()).toBe(204);
    }
  });
});
