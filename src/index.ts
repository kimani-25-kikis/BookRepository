import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json('Server is running on port 3000')
})

let bookRepo =[
  {book_id:1,Author:"Joshua",title:"Databses", year:2023,genre:"Coding"},
  {book_id:2,Author:"Denis",title:"Data Structures", year:2021,genre:"Programming"},
  {book_id:3,Author:"Peter",title:"Algorithm", year:1990,genre:"Fantasy"}

];

app.get('/api/bookRepo', (c)=>{
    return c.json(bookRepo)
})

app.get('api/bookRepo/:book_id', (c)=>{
   const book_id =parseInt (c.req.param('book_id'))
   const bookIndex= bookRepo.find(t=>t.book_id === book_id)
   if(!bookIndex){
    return c.json({error:"Not found"})
   }else{
    return c.json(bookIndex)
   }
})

let nextId=4
app.post('/api/bookRepo', async (c)=>{
  const{Author, title, year, genre} = await c.req.json();

  const nextBook= {book_id:nextId++, Author:Author,title:title, year:year, genre:genre};

  bookRepo.push(nextBook)
  return c.json(nextBook,201)
})

app.delete('/api/bookRepo/:book_id', async (c)=>{
  const book_id= await parseInt(c.req.param('book_id'))

  const bookIndex= bookRepo.findIndex(t=>t.book_id === book_id)

  if(bookIndex === -1){
    return c.json({error:"Not found"})
  }else{
   const delBook= bookRepo.splice(bookIndex,1)
   return c.json(delBook)
  }
})

app.put('api/bookRepo/:book_id', async (c)=>{
 const book_id = parseInt(c.req.param('book_id'))
 const{Author, year} = await c.req.json()

 const bookIndex = bookRepo.findIndex(t=>t.book_id === book_id)
 if(bookIndex===-1){
  return c.json({error:"Not found"})
 }else{
  bookRepo[bookIndex] = {...bookRepo[bookIndex], Author, year}
  return c.json(bookRepo[bookIndex])
 }
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
