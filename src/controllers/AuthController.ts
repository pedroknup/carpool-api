import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';
import { users } from '../entity/users';
import { removeAtt } from '../util/object';

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { phone, password } = req.body;
    if (!(phone && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(users);
    let user: users;
    try {
      user = await userRepository.findOneOrFail({ where: { phone } });
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }
    user = removeAtt(user, ['password']);

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id, phone: user.phone }, config.jwtSecret, { expiresIn: '1h' });

    //Send the jwt in the response
    res.send({ user, token });
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
