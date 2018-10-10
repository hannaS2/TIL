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
        // const user = new User(ctx.request.body);
        const user = new User({name:ctx.request.body.name, email:ctx.request.body.email});
        user.save(function(err) {
            if (err) console.error(err);
            else console.log("Saved!");
        });
        ctx.body = "post ok";
    }
}

const putUser = {
    path: "/users/:id",
    method: "PUT",
    validate: {
        body: {
            email: Joi.string().email(),
            name: Joi.string()
        },
        type: "json"
    },
    async handler(ctx) {
        await User.findById(ctx.request.params.id, async function(err, user) {
            console.log('--- Update(PUT) ---');
            if (err) {
                console.error(err);
                return;
            } else {
                user.name = ctx.request.body.name;
                user.email = ctx.request.body.email;

                await user.save(async function(err) {
                    if (err) console.error(err);
                    else console.log("--- Update! ---");
                });
            }
        })
        
        ctx.body = "put ok";
    }
}

const getUser = {
    path: "/users",
    method: "GET",
    async handler(ctx) {
        await User.find(async function(err, users) {
            console.log('--- Read all ---');
            if (err) console.error(err);
            else ctx.body = users;
        });
    }
}

const deleteUser = {
    path: "/users/:id",
    method: "DELETE",
    async handler(ctx) {
        User.remove({_id: ctx.request.params.id}, function(err) {
            console.log("--- Delete ---");
            if(err) console.error(err);
            console.log("--- Deleted ---");
        });
        ctx.body = "delete ok";
    }
}


// 배열로 사용해서 제거하든 추가하든 ./routes 파일 수정할 필요없음
module.exports = [
    postUser,
    putUser,
    getUser,
    deleteUser
];
