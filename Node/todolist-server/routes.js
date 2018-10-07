// const Router = require("koa-router");
// const apiRouter = new Router();
const router = require("koa-joi-router");
const apiRouter = router();
const Joi = router.Joi;

const userController = require("./controllers/user");

apiRouter.get("/", function (ctx) {
    ctx.body = "Hello, TODO Service"
});

/* controller에서 하는 것이 좋음
apiRouter.route({
    path: "/users",
    method: "POST",
    validate: {
        body: {
            email: Joi.string().email().required(),  // .email()형식도 체크, .required() 필수 항목, default("~") default값 설정
            name: Joi.string().required()
        },
        type: "json"
    },
    handler: userController.postUser
});
*/

apiRouter.post("/users", userController.postUser);

module.exports = apiRouter;