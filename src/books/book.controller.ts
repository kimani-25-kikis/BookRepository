import { Hono } from "hono"
import { type Context } from "hono"
import { getDbPool } from "../db/config.ts";
import * as bookService from './book.service.ts'


// let nextId=4
// let bookRepo =[
//   {book_id:1,Author:"Joshua",title:"Databses", year:2023,genre:"Coding"},
//   {book_id:2,Author:"Denis",title:"Data Structures", year:2021,genre:"Programming"},
//   {book_id:3,Author:"Peter",title:"Algorithm", year:1990,genre:"Fantasy"}

// ];

export const getAllBooks= async(c:Context)=>{
    try{
      const db=getDbPool()
      const totalBooks= await db.request().query('SELECT * FROM Books')

      return c.json({results: totalBooks})
    }catch (error){

    }
}

// export const getBookById= (c:Context)=>{
//    const book_id =parseInt (c.req.param('book_id'))
//    const bookIndex= bookRepo.find(t=>t.book_id === book_id)
//    if(!bookIndex){
//     return c.json({error:"Book Not found"})
//    }else{
//     return c.json(bookIndex)
//    }
// }

export const getBookById = async (c: Context)=>{
  const book_id = parseInt(c.req.param('book_id'))
    try{
      const result =  await bookService.getBookByIdService(book_id)
      if(result===null){
        return c.json({error: "book not found"}, 404);
      }
      return c.json(result);
    }catch(error){
      console.error("Error fetching todo:", error);
      return c.json({error:"Failed to fetch todo"},500)
    }
    
}

export const createBook= async (c:Context)=>{
  const body = await c.req.json() as { title:string,author:string, genre:string,published_year:number,isbn:string,price:number,stock_quantity:number}
  try{
    const result = await bookService.createBookService(body.author,body.title,body.genre,body.isbn,body.published_year,body.price,body.stock_quantity);

    if (result === "Book Created Successfully") {
            return c.json({ message: result }, 201);
        }else {
            return c.json({ error: 'Failed to create book' }, 500);
        }
    } catch (error) {
        console.error('Error creating book:', error);
        return c.json({ error: 'Failed to create book' }, 500);
    }
}
  

export const removeBook= async (c:Context)=>{
  const book_id=  parseInt(c.req.param('book_id'))
  try{
    const check = await bookService.getBookByIdService(Number(book_id));
    if(check==null){
      return c.json({error:'Book not found'},404)
    }
    const result = await bookService.deleteBookService(book_id);
    if(result === null){
      return c.json({error:"Failed to delete Book"},500)
    }
     return c.json({ message: result }, 200);
  } catch (error) {
        console.error('Error deleting todo:', error);
        return c.json({ error: 'Failed to delete todo' }, 500);
    }
  }

  

export const updateBook = async (c:Context)=>{
 const book_id = parseInt(c.req.param('book_id'))
  const body = await c.req.json() as {book_id:string, title:string,author:string,genre:string, published_year:number,isbn:string,price:number,stock_quantity:number}
  try{
    const checkIfExists = await bookService.getBookByIdService(book_id);

    if(checkIfExists ===null){
      return c.json({error:"Book not found"},404);
    }
    const result = await bookService.updateBookService(book_id, body.title,body.author,body.genre,body.published_year ,body.isbn, body.price, body.stock_quantity);
    if (result === "Failed to update book"){
      return c.json({error:result}, 500);
    }
    return c.json({message:result},200);
  }catch (error){
    console.error('Error updating Book:', error);
        return c.json({ error: 'Failed to update book' }, 500);
  }
}
 

 