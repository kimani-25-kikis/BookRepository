import { Hono } from "hono";

import { getAllBooks,getBookById,createBook,removeBook,updateBook } from "./book.controller.ts";

const bookROutes=new Hono

// let nextId=4
// let bookRepo =[
//   {book_id:1,Author:"Joshua",title:"Databses", year:2023,genre:"Coding"},
//   {book_id:2,Author:"Denis",title:"Data Structures", year:2021,genre:"Programming"},
//   {book_id:3,Author:"Peter",title:"Algorithm", year:1990,genre:"Fantasy"}

// ];
bookROutes.get('bookrepo',getAllBooks )

bookROutes.get('bookrepo/:book_id',getBookById )


bookROutes.post('bookRepo',createBook )

bookROutes.delete('bookRepo/:book_id', removeBook )

bookROutes.put('bookRepo/:book_id',updateBook )

export default bookROutes;