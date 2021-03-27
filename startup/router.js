const express = require('express');
const userRouter = require('../src/users/router');
const organizationRouter = require('../src/organizations/router');

module.exports = function (app) {
    app.use(express.json({ limit:"5mb" }));
    app.use(express.urlencoded({ limit:"5mb", extended: true }));

    app.use('/', express.Router().get("/api/v1/welcome", (req, res) => res.status(200).json({ 
        message: "Hello, welcome!" })
    ));
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/organizations', organizationRouter);

};