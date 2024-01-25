import express from 'express';
import productsRouter from './router/product.route';

const app = express();

app.use(express.json());

app.get('/healthcheck', (req, res) => res.sendStatus(200));

app.use('/products', productsRouter);

export default app;
