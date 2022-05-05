#!/usr/bin/env node

/**
 * Module dependencies.
 */
 import express from 'express';
 import HttpStatus from 'http-status-codes';
 import Promise from 'bluebird';
 
 import {authenticateRoutes, userRoutes} from './src/routers';
 import init from './src/config/init';
 import config from './src/config/appConfig';
 import logger from './src/util/loger';
 import errorFactory from './src/util/errorFactory';
 import models from './src/models';
 import middlewares from './src/middlewares';
 
const http = require("http");
const app = require("./app");

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

const registerApi = (server) => {
  authenticateRoutes(server);
  userRoutes(server);
};

const registerGlobalErrorHandler = (server) => {
  server.use((err, req, res, next) => {
    logger.error(err.message || err, {token: req.traceId});
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
      .json(err || errorFactory.internalServerError(req.traceId, err));
  });
};
init();
middlewares.configure(server);
registerApi(server);
registerGlobalErrorHandler(server);
models.sequelize.sync({}).then(() => {
  server.listen(config.port, () => {
    logger.info(`Server started and listening on port ${config.port}`);
  });
});
