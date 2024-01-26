import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
// @ts-ignore
import dotenv from 'dotenv';
import express, { Express } from 'express';
import adminRoutes from './routes/admin.routes';
import generalRoutes from './routes/general.routes'; 

const main = async () => {
  dotenv.config();
  const app: Express = express();
  const PORT = process.env.PORT || 8000;

  app.use((req, res, next) => {
    express.json()(req, res, next);
  });

  app.set('trust proxy', 1);

  app.use((req, res, next) => {
    bodyParser.json()(req, res, next);
  });
  app.use(morgan('combined'));
  app.use(cookieParser());
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  
  app.use(
    cors({
      origin: [
        process.env.CLIENT_URL!,
        process.env.ADMIN_URL!,
      ],
      methods: ['POST', 'PATCH', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
      credentials: true,
    })
  );

  app.use('/v1', generalRoutes);
  app.use('/v1/admin', adminRoutes);

  app.listen(PORT, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  );
};

main().catch((err) => {
  console.log('Error Occurred:', err);
  process.exit(1);
});
