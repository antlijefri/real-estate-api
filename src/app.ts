import { AppDataSource } from './config/database/typeormConfig';
import { initExpress } from './config/express/expressConfig';

const app = async () => {
  try {
    await AppDataSource.initialize();
    console.log(' -------- DataBase Connected --------');

    await initExpress();
  } catch (err: any) {
    throw new Error(err);
  }
};

app()
  .then()
  .catch((err) => console.log(`Application Crashed: ${err}`));
