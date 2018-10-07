const Router = require("koa-router");
const apiRouter = new Router();

const userController = require("./controllers/user");

apiRouter.get("/", function (ctx) {
    ctx.body = "Hello, TODO Service"
});

apiRouter.post("/users", userController.postUser);

module.exports = apiRouter;