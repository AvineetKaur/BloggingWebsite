import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { UpdateblogInput, createblogInput, updateblogInput } from "@aviinee/bloggingwebsite-common";


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
blogRouter.use('/*', async (c, next) => {
    //get the header
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];

    //verify the token
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
        c.set("userId", String(user.id))
        await next()
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
    const authorID = c.get("userId");
    const { success } = createblogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            "message": "Incorrect inputs. Please check again!"
        })

    }

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorID: Number(authorID)
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (e) {
        return c.json({ error: String(e) })
    }
})

//modify the blog
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateblogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            "message": "Incorrect inputs. Please check again!"
        })

    }
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

//get all blogs at home page
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();
    //add pagintaion
    return c.json({ blogs })
})

//search one blog
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
        where: {
            id: Number(id)
        }
    })
    return c.json({ blog });
})


