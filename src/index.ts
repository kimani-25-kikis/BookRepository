import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import bookROutes from './books/book.routes.ts'
import  initDatabaseConnection  from './db/config.ts'
import type { Context } from 'hono'


const app = new Hono()

app.get('/', (c:Context) => {
  return c.json('Server is running on port 3000')
})

const port= Number(process.env.PORT) || 3000;
app.route('/api',bookROutes)

//initialize Db and start the server
initDatabaseConnection().then(()=>{
//start the server only when the DB is connected
  serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

})