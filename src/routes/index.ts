import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import ride from './ride';
import region from './region';
import home from './home';
import banner from './banner';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/ride', ride);
routes.use('/home', home);
routes.use('/banner', banner);
routes.use('/region', region);

export default routes;
