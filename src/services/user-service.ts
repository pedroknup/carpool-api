import { getRepository } from "typeorm";
import { users } from "../entity/users";

export const getUserById = async (id: number) => {
  //Get regions from database

  const userRepository = getRepository(users);

  return await userRepository.findOne({
    id
  });
};
