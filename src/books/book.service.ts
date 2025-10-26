import { getDbPool } from "../db/config.ts"

interface UserResponse {
    book_id: string;
    title: string;
    author: string;
    published_year: number;
    isbn: string;
    price: number;
    stock_quantity: number
}

//get all books
export const getAllBooksService = async (): Promise<UserResponse[] > => {

        const db = getDbPool(); 
        const query = 'SELECT * FROM Books';
        const result = await db.request().query(query);
        return result.recordset;
}

//get book by book_id
export const getBookByIdService = async (book_id: number): Promise<UserResponse | null> => {
        const db = getDbPool(); 
        const query = 'SELECT * FROM Books WHERE book_id = @book_id';
        const result = await db.request()
            .input('book_id', book_id)
            .query(query);
        return result.recordset[0] || null;
}

//get book by author
export const getBookByAuthorService = async (author: string): Promise<UserResponse | null> => {
    const db = getDbPool(); 
    const query = 'SELECT * FROM Books WHERE author = @author';
    const result = await db.request()
        .input('author', author)
        .query(query);
    return result.recordset[0] || null;
}

//create new book
export const createBookService = async (
  author: string,
  title: string,
  genre: string,
  isbn: string,
  published_year: number,
  price: number,
  stock_quantity: number
): Promise<string> => {
  const db = getDbPool()
  const query =
    'INSERT INTO Books (title, author, genre, published_year, isbn, price, stock_quantity) OUTPUT INSERTED.* VALUES (@title, @author, @genre, @published_year, @isbn, @price, @stock_quantity)'
  const result = await db
    .request()
    .input('title', title)
    .input('author', author)
    .input('genre', genre)
    .input('published_year', published_year)
    .input('isbn', isbn)
    .input('price', price)
    .input('stock_quantity', stock_quantity)
    .query(query)
  return result.rowsAffected[0] === 1 ? 'Book created successfully' : 'Failed to create book'
}

//update book by book_id
export const updateBookService = async (
  book_id: number,
  title: string,
  author: string,
  genre: string,
  published_year: number,
  isbn: string,
  price: number,
  stock_quantity: number
): Promise<string> => {
  const db = getDbPool()
  const query =
    'UPDATE Books SET title = @title, author = @author, genre = @genre, published_year = @published_year, isbn = @isbn, price = @price, stock_quantity = @stock_quantity OUTPUT INSERTED.* WHERE book_id = @book_id'
  const result = await db
    .request()
    .input('book_id', book_id)
    .input('title', title)
    .input('author', author)
    .input('genre', genre)
    .input('published_year', published_year)
    .input('isbn', isbn)
    .input('price', price)
    .input('stock_quantity', stock_quantity)
    .query(query)
  return result.rowsAffected[0] === 1 ? 'Book updated successfully' : 'Failed to update book'
}

//delete book by book_id
export const deleteBookService = async (book_id:number): Promise<string> => {
        const db = getDbPool(); 
        const query = 'DELETE FROM Books WHERE book_id = @book_id';
        const result = await db.request()
            .input('book_id', book_id)
            .query(query);
        return result.rowsAffected[0] === 1 ? "Book deleted successfully 🎊" : "Failed to delete book";
}
