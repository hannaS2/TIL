const mongoose = require("mongoose");
const Task = require("../models/Task");
const _ = require("lodash");
const Joi = require("koa-joi-router").Joi;

const {
    ClientError
} = require("../error");

const postTask = {
    path: "/tasks",
    method: "POST",
    validate: {
        headers: {
            authorization: Joi.string().required()
        },
        body: {
            title: Joi.string().required(),
            content: Joi.string(),
            deadline: Joi.date(),
        },
        type: "json"
    },
    async handler(ctx) {
        if (_.isNil(ctx.user)) {
            throw new ClientError("Unauthorized");
        }

        const task = new Task({
            ...ctx.request.body,
            userId: ctx.user._id
        });
        
        ctx.body = await task.save();
    }
}

const putTask = {
    path: "/tasks/:id",
    method: "PUT",
    validate: {
        body: {
            title: Joi.string(),
            content: Joi.string(),
            deadline: Joi.date()
        },
        type: "json"
    },
    async handler(ctx) {
        if (_.isNil(ctx.user)) {
            throw new ClientError("Unauthorized");
        }

        const data = ctx.request.body;

        const task = await Task.findById(ctx.request.params.id);
        console.log(task.userId+" / "+ctx.user._id);
        if(task.userId == ctx.user._id) {
            ctx.body = await Task.findByIdAndUpdate(ctx.request.params.id, data, {
                new: true
            });
        } else {
            throw new ClientError("Only update your task")
        }
        
    }
}

const getTask = {
    path: "/tasks",
    method: "GET",
    async handler(ctx) {
        if (_.isNil(ctx.user)) {
            throw new ClientError("Unauthorized");
        }

        const task = await Task.find({userId: ctx.user._id});
        ctx.body = task;
    }
}

const deleteTask = {
    path: "/tasks/:id",
    method: "DELETE",
    async handler(ctx) {
        if (_.isNil(ctx.user)) {
            throw new ClientError("Unauthorized");
        }

        const task = await Task.findById(ctx.request.params.id);
        if(task.userId == ctx.user._id) {
            ctx.body = await Task.findByIdAndDelete(ctx.request.params.id);
        } else {
            throw new ClientError("Only delete your task")
        }
        
    }
}

module.exports = [
    postTask,
    putTask,
    getTask,
    deleteTask
];
