import express, { Request, Response } from 'express';
import { ProductRoutes } from './modules/product/product.route';
import { OrderRoutes } from './modules/order/order.route';
import notFoundHandler from './middleware/notFound';


const app = express();

//parsers
app.use(express.json());

app.use("/api/products", ProductRoutes)
app.use("/api/orders", OrderRoutes)


// Not found route handler
app.use(notFoundHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Express!!!!');
});

export default app;
