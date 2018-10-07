
// require: Java's import와 동일한 개념
const Koa = require("koa");
//const Router = require("koa-router");
//const logger = require("koa-logger");
const logger = require("./logger");  // ./logger.js
const config = require("./config");
const bodyParser = require("koa-bodyparser");

console.log(config);

// 변수명 대문자는 클래스, 소문자는 인스턴스로 다큐멘트 잘 보고 !
const app = new Koa();
//const router = new Router();
const router = require("./routes");

// Javascript
//   Compile 언어
//     C, C++, Java, C#
//     Source -> Binary

//   Script 언어
//    : Compile 단계가 존재하지 않습니다.
//    Runtime이라고 부르는 스크립트 해석기
//     => 인터프리터
//    인터프리터가 코드를 실시간으로 해석해서, 수행한다.


// Javascript - Web Client

// Node.js
// : Javascript를 브라우져가 아닌 네이티브(Windows, Linux, Mac)에서
// 수행할 수 있도록 해주는 플랫폼입니다.

// WAS Middleware
//  express, koa, restify, Hapi

// log
// winston, bunyan, morgan


// router는 주소패스에 대해서 어떤식으로 처리할지 제공해줌
// router.get("/", function (ctx) {  // 도메인에 대한 페이지 제공2
//     // throw new Error("Error Test");
//     ctx.body = "Hello, TODO Service"
// });
// router를 ./routes에서 만들어서 써줬으므로 위 코드 필요 없음 *1

//app.use(logger());  // 순서!! logger는 use중 위로 올려줘야함!
// middleware가 주는 형식에 따라야한다.
const logHandler = require("./middlewares/logHandler")
app.use(logHandler({ // logger넘겨줌
    logger  
}));

// Joi error handler1
// error메세지를 원하는 것만 보기 좋게 출력하도록
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = {
            message: err.message,
            body: ctx.request.body,
            query: ctx.request.query
        }
        ctx.app.emit("error", err, ctx);
    }
});

// Joi 쓰려면 사용하면 안된다!!! -> 행(hang) 현상
// app.use(bodyParser());  

// app에 router 등록3
// app.use(router.routes())
// .use(router.allowedMethods());
// router를 ./routes에서 만들어서 써줬으므로 위 코드 대신 아래코드로 대체 *2
app.use(router.middleware());

// Joi error handler2
app.on("error", (err, ctx) => {
    if (ctx == null) {
      logger.error({
        err,
        event: "error",
      });
    }
  });


// mongoose
// 데이터베이스 접속해서, 데이터를 저장하고, 로드하는 연산을 수행하는
// 클라이언트
//   : Database Connector
// MySQL - mysql-connector(client) / JDBC
// MongoDB - mongoose

// Javascript 함수를 만드는 방법
//   => 호이스팅 (밑에서 만들어도 위에서 사용 가능, 때문에 var변수 사용 금지)때문에 첫번째 방법으로 함수 사용하지 않는 것이 좋음
/*1
function setupDatabase() {
}
*/
/*2
const setupDatabase = function() {
}
*/
/*3
const setupDatabase = () => {
}
*/
const setupDatabase = function(config) {
    const mongoose = require("mongoose");
    // "mongodb://${user}:${password}@${host}:${port}/${name}"
    //const dbUri = "mongodb://hello:linux123@13.125.75.103:27000/hello";
    with(config.database) {
        const dbUri = `mongodb://${user}:${password}@${host}:${port}/${name}`;
        mongoose.connect(dbUri, {
            useNewUrlParser: true
        });
    }
    

    const db = mongoose.connection;
    db.on("open", () => {
        console.log("Database connection successful");
    });
    db.on("connected", () => {
        console.log("MongoDB connected");
    });
    db.on("reconnected", () => {
        console.log("MongoDB reconnected");
    });
    db.on("error", (err) => {
        console.log("Error in MongoDB: " + err);
    });
    db.on("disconnected", () => {
        console.log("MongoDB disconnected")
    });
}

setupDatabase(config);

app.listen(3000);  // 서버가 뜬다.1


