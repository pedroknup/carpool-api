import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';
import { users } from '../entity/users';
import { removeAtt } from '../util/object';

function sortByFrequency(array) {
  var frequency = {};

  array.forEach(function(value) {
    frequency[value] = 0;
  });

  var uniques = array.filter(function(value) {
    return ++frequency[value] == 1;
  });

  return uniques.sort(function(a, b) {
    return frequency[b] - frequency[a];
  });
}
class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { fbtoken, igtoken } = req.body;
    if (!(fbtoken || igtoken)) {
      console.log(fbtoken);
      res.status(400).send('Bad request');
      return;
    }

    //Get user from database
    const userRepository = getRepository(users);
    let user: users;
    try {
      user = await userRepository.findOneOrFail({ where: { facebook_id: 123 }, relations: ['rides', 'routes', 'routes.idDestination'] });
    } catch (id) {
      //not found
      // TODO: redirect to sign user up
      res.status(401).send('Usuário não encontrado');
      return;
    }
    // //Check if encrypted password match
    // if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //   res.status(401).send('Usuário ou senha inválidos');
    //   return;
    // }
    user = removeAtt(user, ['password']);

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });

    //Send the jwt in the response

    let favPoints = [];
    let favRoutes = [];
    let rating = 4.6;
    // TODO calculate rating
    console.log('user' + JSON.stringify(user.routes[0]));
    let newUserObj = { ...user, favPoints, favRoutes, rating };
    try {
      const arr = user.rides;
      // res.send({ arr });
      // return;
      // arr.lastIndexOf(key) === idx).sort((a, b) => a < b ? -1 : 1);
      //  const pointsUser = await userRepository.findOneOrFail(
    } catch (err) {}
    res.send({ user: newUserObj, token });
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword, newPassword);
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
      return;
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
      return;
    }
    if (user == undefined || user == null) {
      res.status(401).send();
      return;
    }

    try {
      //Check if old password matchs
      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
      }
    } catch (id) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
