'use strict'

const _ = require("lodash");
const bunyan = require("bunyan");
const humanize = require('humanize-number');

const reqSerializer = (ctx = {}) => {
    return {
      method: ctx.method,
      path: ctx.path,
      url: ctx.url,
      headers: ctx.headers,
      protocol: ctx.protocol,
      ip: ctx.ip,
      query: ctx.query,
      body: ctx.request.body,
    };
  }
  
  const resSerializer = function (ctx = {}) {
    return {
      statusCode: ctx.status,
      responseTime: ctx.responseTime,
      type: ctx.type,
      headers: (ctx.response || {}).headers,
      body: ctx.body,
    };
  }

  function time(start) {
    const delta = new Date - start;
    return humanize(delta < 10000
      ? delta + 'ms'
      : Math.round(delta / 1000) + 's');
  }

//const log = function(options = {}) {  // options으로 logger를 받음
//    const logger = options.logger
const log = function({
    logger = null  // 인자가 없을 때 null로 지정
} = {}) {
    // ==(객체 동등성), ===(참조 동등성) -> javascript는 ===쓰는게 좋음, ==는 타입이상하게 잘안됨(lodash isNil사용)
    if(_.isNil(logger)) {
        throw Error("Logger is required");
    }

    // return function(ctx, next) { // next는 다음 미들웨어로 전달 -> 라우터에 연결  
    //     next();
    // }
    return async (ctx, next) => {
        ctx.log = logger;
        ctx.log.addSerializers({
            req: reqSerializer,
            res: resSerializer,
            err: bunyan.stdSerializers.err
        });

        // request logging
        ctx.log.info({
            req: ctx,
            event: "request"
        })

        try {
            const startTime = new Date();
            await next();  // 결과 처리 후 response 채움
            ctx.responseTime = time(startTime);
            ctx.log.info({
                res: ctx,
                event: "response"
            })
        } catch (err) {
            ctx.log.error ({
                err,
                event: "error"
            });
            throw err;  // 안 하면 Not Found
        }
    }
};

module.exports = log;