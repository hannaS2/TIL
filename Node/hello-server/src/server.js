
// Koa
const Koa = require("koa");    // import
const Router = require("koa-router");
const logger = require("koa-logger");

const app = new Koa();
const router = new Router();

// Router
// 127.0.0.1:3000/users
// 127.0.0.1:3000/users/hannah
/*
app.use(async ctx => {
    ctx.body = "Hello, Koa"
});
*/

router.get("/", async ctx => {
    ctx.body = {
        name: "Hello REST API Server",
        version: "1.0.5",
        links: {
            user_url: "https://api.hannahi.xyz/users"
        }
    };
});

router.get("/users", async ctx => {
    ctx.body = [
        {
            name: "Tom",
            age: 42
        }, {
            name: "Alice",
            age: 12
        }
    ]
});

app.use(logger());
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);