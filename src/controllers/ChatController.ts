import { provinces } from './../entity/provinces';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { rides } from '../entity/rides';
import { getRegionById } from '../services/rides-service';
import { IRoute } from '../models/route';
import { getUserById } from '../services';
import { regions } from '../entity/regions';
import { confirmed_users } from '../entity/confirmed_users';
import { messages } from '../entity/messages';
import { users } from '../entity/users';

class ChatController {
  static postMessage = async (req: Request, res: Response) => {
    const idUser = res.locals.jwtPayload.userId;
    const idRide: number = req.params.id;
    let text: string = req.body.text;
    const ridesRepository = getRepository(rides);
    const messagesRepository = getRepository(messages);
    const userRepository = getRepository(users);

    if (!idUser || !idRide || !text) {
      res.status(400).send('Bad Request');
      return;
    }
    if (text.trim().length === 0) {
      res.status(400).send('O campo mensagem é obrigatório!');
      return;
    }
    let ride: rides;
    let userTask, rideTask;
    try {
      ride = await ridesRepository.findOneOrFail({
        where: { id: idRide },
        relations: ['user', 'confirmedUsers', 'confirmedUsers.user']
      });
    } catch {
      res.status(402).send('Carona não encontrada.');
      return;
    }
    let user: users;
    try {
      user = await userRepository.findOneOrFail({
        where: { id: idUser }
      });
    } catch {
      res.status(401).send('Usuário não encontrado.');
      return;
    }

    if (ride.user.id !== idUser)
      if (!ride.confirmedUsers.find(confirmedUser => confirmedUser.user.id)) {
        res
          .status(402)
          .send('Você não está confirmado nessa oferta de carona, portanto você não pode participar do chat da mesma.');
        return;
      }
    //TODO: uncomment this
    // if (ride.expires_at <= new Date()) {
    //   res.status(402).send('Essa oferta de carona expirou.');
    //   return;
    // }
    const message: messages = {
      text: text,
      user,
      id: 0,
      ride,
      created_at: new Date()
    };
    try {
      await messagesRepository.save(message);
      res.status(200).send(message);
      return;
    } catch {
      res.status(500).send('Ocorreu um erro interno no servidor. Por favor, tente novamente dentre alguns minutos.');
    }
  };
}

export default ChatController;
