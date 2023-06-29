import express, { Express } from 'express';
import api from './routers/api';

const app: Express = express();
app.use(express.json());

app.use('/', api);

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});

export default app;
