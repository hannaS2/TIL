// const Router = require("koa-router");
// const apiRouter = new Router();
const router = require("koa-joi-router");
const apiRouter = router();
const Joi = router.Joi;

const userController = require("./controllers/user");
const taskController = require("./controllers/task")

apiRouter.get("/", function (ctx) {
    ctx.body = "Hello, TODO Service";
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

// 아래처럼 사용하면 postUser밖에 사용못함
// apiRouter.post("/users", userController.postUser);

// 아래처럼 사용하면 userController에서 추가/제거되는 것 수정해줘야 하므로 효율x
// apiRouter.route([
//     userController.postUser,
//     userController.putUser
// ]);

// 따라서, 배열받아서 사용
apiRouter.route([
    ...userController,
    ...taskController
]);

module.exports = apiRouter;