// const Koa = require('koa');
// const { koaBody } = require('koa-body');
// const routes = require('./routes/routes.js');
// const bodyParser = require('koa-bodyparser');

import Koa from 'koa';
import { koaBody } from 'koa-body';
import routes from './routes/routes.js';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());
app.use(bodyParser());

app.listen(5000);