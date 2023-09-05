import Koa from 'koa';
import { koaBody } from 'koa-body';
import router from './routes/routes.js';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());

app.listen(5000);