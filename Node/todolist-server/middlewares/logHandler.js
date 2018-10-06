'use strict'

const _ = require("lodash");
const bunyan = require("bunyan");
//const log = function(options = {}) {  // options으로 logger를 받음
//    const logger = options.logger
const log = function({
    logger = null  // 인자가 없을 때 null로 지정
} = {}) {
    // ==(객체 동등성), ===(참조 동등성) -> javascript는 ===쓰는게 좋음, ==는 타입이상하게 잘안됨(lodash사용)
    if(_.isNil(logger)) {
        throw Error("Logger is required");
    }

    return function(ctx, next) { // next는 다음 미들웨어로 전달 -> 라우터에 연결
        console.log("hello~");
        next();
    };
};

module.exports = log;