import { useExpressServer, useContainer } from 'routing-controllers';
import express from 'express';
import { Container } from 'typedi';
import { app as appconfig } from '../utils/env';
import { AdminController } from '../../api/controllers/admin/AdminController';
import { authorizationChecker } from '../../api/auth/Auth';
import { PropertyAdminController } from '../../api/controllers/admin/PropertyController';
import { UserAdminController } from '../../api/controllers/admin/UserController';
import { UserStoreController } from '../../api/controllers/store/UserController';
import { PropertyStoreController } from '../../api/controllers/store/PropertyController';
import { MediaController } from '../../api/controllers/utility/MediaController';

export const initExpress = () => {
  useContainer(Container);

  const bodyParser = require('body-parser');

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  useExpressServer(app, {
    cors: true,
    routePrefix: appconfig.prefix,
    controllers: [
      AdminController,
      PropertyAdminController,
      UserAdminController,
      UserStoreController,
      PropertyStoreController,
      MediaController
    ],
    authorizationChecker: authorizationChecker,
  });

  app.listen(appconfig.port, () => {
    console.log(`-------- App is Ready On ${appconfig.port} --------`);
  });
};
