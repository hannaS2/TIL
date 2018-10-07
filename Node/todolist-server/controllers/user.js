const mongoose = require("mongoose");
const User = require("../models/User");
const _ = require("lodash");
const Joi = require("koa-joi-router").Joi;

/* koa-router
const postUser = (ctx) => {
    //console.log(ctx.request.body);

    const {
        email = null,
        name = null
    } = ctx.request.body;
    
    if(_.isNil(email)) {
        ctx.status = 400;
        ctx.body = {
            message: "email field required"
        };
        return;
    }

    if(_.isNil(name)) {
        ctx.status = 400;
        ctx.body = {
            message: "name field required"
        };
        return;
    }

    ctx.body = "ok";
};

module.exports.postUser = postUser;
*/

// Validator = Joi validator
/*
module.exports.postUser = {
    path: "/users",
    method: "POST",
    validate: {
        body: {
            email: Joi.string().email().required(),
            name: Joi.string().required()
        },
        type: "json"
    },
    async handler(ctx) {
        ctx.body = "ok";
    }
};
*/

const postUser = {
    path: "/users",
    method: "POST",
    validate: {
        body: {
            email: Joi.string().email().required(),
            name: Joi.string().required()
        },
        type: "json"
    },
    async handler(ctx) {
        ctx.body = "post ok";
    }
}

const putUser = {
    path: "/users",
    method: "PUT",
    async handler(ctx) {
        ctx.body = "put ok";
    }
}

// 배열로 사용해서 제거하든 추가하든 ./routes 파일 수정할 필요없음
module.exports = [
    postUser,
    putUser
];
