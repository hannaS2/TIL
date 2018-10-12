const mongoose = require("mongoose");
const Task = require("../models/Task");
const _ = require("lodash");
const Joi = require("koa-joi-router").Joi;

const postTask = {
    path: "/tasks",
    method: "POST",
    validate: {
        body: {
            title: Joi.string().required(),
            content: Joi.string(),
            deadline: Joi.date()
        },
        type: "json"
    },
    async handler(ctx) {
        // console.log(Date(ctx.request.body.deadline));
        const task = new Task(ctx.request.body);
        await task.save(async function(err) {
            if (err) console.error(err);
            else console.log("Saved!");
        });
        ctx.body = "post ok";
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
        await Task.findById({_id: ctx.request.params.id}, async function(err, task) {
            console.log('--- Update(PUT) ---');
            if (err) {
                console.error(err);
                return;
            } else {
                if(ctx.request.body.title) task.title = ctx.request.body.title;
                if(ctx.request.body.content) task.content = ctx.request.body.content;
                if(ctx.request.body.deadline) task.deadline = ctx.request.body.deadline;

                await task.save(async function(err) {
                    if (err) console.error(err);
                    else console.log("--- Update! ---");
                });
            }
        })
        
        ctx.body = "put ok";
    }
}

const getTask = {
    path: "/tasks",
    method: "GET",
    async handler(ctx) {
        await Task.find(async function(err, tasks) {
            if (err) console.error(err);
            else ctx.body = tasks;
        });
    }
}

const deleteTask = {
    path: "/tasks/:id",
    method: "DELETE",
    async handler(ctx) {
        await Task.remove({_id: ctx.request.params.id}, async function (err) {
            console.log("--- Delete ---");
            if (err) console.error(err);
            console.log("--- Deleted ---");
        });
        ctx.body = "delete ok";
    }
}

module.exports = [
    postTask,
    putTask,
    getTask,
    deleteTask
];
