import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

//middleware
blogRouter.use('/api/v1/blog/*', async (c, next) => {
    //get the header
    const header = c.req.header("Authorisation") || "";
    const token = header.split(" ")[1];

    //verify the token
    const id = await verify(token, c.env.JWT_SECRET);
    if (id) {
        c.set("userId", String(id));
        next()
    }
    else {
        return c.json({
            error: "Unauthorised"
        })
    }


})


//create a blog
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const authorID = c.get("userId")
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorID: authorID
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (e) {
        return c.json({ error: e })
    }
})

//modify the blog
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({ id: blog.id });
})

//search one blog
blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const blog = await prisma.post.findFirst({
        where: {
            id: body.id
        }
    })
    return c.json({ blog });
})

//get all blogs at home page
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();
    //add pagintaion
    return c.json({ blogs })
})
