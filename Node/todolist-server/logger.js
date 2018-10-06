'use strict';  // 자바스크립트 엔진의 표준사용

const bunyan = require("bunyan");

const name = "todolist-server";
const config = {
    name,  // name: name,
    streams: [  // 분산(화면에도 파일에도 등등)
        {
            type: "stream",
            stream: process.stdout,
            level: "debug", // = "info"
        }
    ] 
};

const options = {
    ...config,  // spread문법: depth를 날리고 추가, flatMap
    serializers: bunyan.stdSerializers  // 어떻게 parsing할 지
};

const logger = bunyan.createLogger(options);
module.exports = logger; // 외부에서 여기서 등록된 logger를 가져갈 수 있다.

