import express from 'express';
import productsRouter from './router/product.route';
import orderRouter from './router/order.route';

const app = express();

app.use(express.json());

app.get('/healthcheck', (req, res) => res.sendStatus(200));

app.use('/products', productsRouter);

app.use('/orders', orderRouter);

export default app;
