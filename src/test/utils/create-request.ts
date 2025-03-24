import * as fs from 'fs';
import * as path from 'path';
import { USERID } from '../constants/api-request-constant';

/*
 * Function to create a JSON request file to add a book for user.
 */
export async function createAddBookRequestFile(isbn: string, filePath: string) {
  const requestData = {
    userId: USERID,
    collectionOfIsbns: [
      {
        isbn: isbn,
      },
    ],
  };

  const jsonContent = JSON.stringify(requestData, null, 2); // Pretty print with 2 spaces
  fs.writeFileSync(path.resolve(filePath), jsonContent, 'utf8');
  console.log(`JSON file to create add book request created successfully at: ${filePath}`);
}

/*
 * Function to create a JSON request file to get list of books for user.
 */
export async function createGetBooksForUserRequestFile(filePath: string) {
  const requestData = {
    userId: USERID,
  };

  const jsonContent = JSON.stringify(requestData, null, 2); // Pretty print with 2 spaces
  fs.writeFileSync(path.resolve(filePath), jsonContent, 'utf8');
  console.log(`JSON file to create get books for user created successfully at: ${filePath}`);
}

/*
 * Function to create a JSON request file to delete a book for user.
 */
export async function createDeleteBookForUserRequestFile(isbn: string, filePath: string) {
  const requestData = {
    userId: USERID,
    isbn: isbn,
  };

  const jsonContent = JSON.stringify(requestData, null, 2); // Pretty print with 2 spaces
  fs.writeFileSync(path.resolve(filePath), jsonContent, 'utf8');
  console.log(`JSON file to create delete book for user created successfully at: ${filePath}`);
}
