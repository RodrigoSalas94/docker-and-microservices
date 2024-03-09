import express from 'express';
import dotenv from 'dotenv';
import env from './config/env';
import userRouter from './users/routes/userRoutes';
import productRouter from './products/routes/productsRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { errorHandler } from './config/error';

const app = express();
const envFound = dotenv.config({ path: './src/config/env.ts' });
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

app.use(express.json());

const dirSwagger = './src/docs/swagger.yml';
const swaggerDocument = YAML.load(dirSwagger);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use([userRouter, productRouter]);

const PORT = env.PORT;

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
