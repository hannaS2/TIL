const mongoose = require("mongoose");
const User = require("../models/User");
const _ = require("lodash");

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


