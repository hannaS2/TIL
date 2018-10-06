
// require: Java's import와 동일한 개념
const Koa = require("koa");
const Router = require("koa-router");
//const logger = require("koa-logger");
const logger = require("./logger");  // ./logger.js

// 변수명 대문자는 클래스, 소문자는 인스턴스로 다큐멘트 잘 보고 !
const app = new Koa();
const router = new Router();

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
router.get("/", function (ctx) {  // 도메인에 대한 페이지 제공2
    ctx.body = "Hello, TODO Service"
});

//app.use(logger());  // 순서!! use 중 위로 올려줘야함!
// middleware가 주는 형식에 따라야한다.
const logHandler = require("./middlewares/logHandler")
app.use(logHandler({ // logger넘겨줌
    logger  
}));

// app에 router 등록3
app.use(router.routes())
.use(router.allowedMethods());

app.listen(3000);  // 서버가 뜬다.1
