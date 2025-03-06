import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

/*********Handlers**************
 
POST /api/v1/user/signup
POST /api/v1/user/signin
POST /api/v1/blog
PUT /api/v1/blog
GET /api/v1/blog/:id
GET /api/v1/blog/bulk
*/2

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL

  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    },
  })

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({
    jwt: token
  })
})

app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  })

  if (!user) {
    return c.json({ error: "User doesn't exist" })
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ jwt });


  return c.text('Hello Hono!')
})
app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})
export default app

/*db url = "postgresql://neondb_owner:npg_xsoIhYW2w7af@ep-solitary-frost-a5qwvn62-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require";

connectionpool url = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiY2JjOWMyYmItNDQ3Zi00NzRjLTk4NDgtZmI2YjFiNWUzZWUxIiwidGVuYW50X2lkIjoiYmYzNTRjMjQxOTYwMjhhMjI3ZWI5YTk1Y2NlMTY2MDlkMzQ0ZTQyMWQwNTU5YWU0MjVkMGIzNzJjNWE0M2VmZiIsImludGVybmFsX3NlY3JldCI6Ijc3NWQwMDVkLTkzNjQtNGYxZS04MGM2LTI1OWI5MWRjZmVkMSJ9.3tk7BpwVrJO8SCAhUQDOom2Lq77--Tx8GhIWpk_f-LU"*/

