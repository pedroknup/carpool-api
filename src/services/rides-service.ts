import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { regions } from "../entity/regions";

export const getRegionById = async (idRegion: number) => {
  //Get regions from database

  const regionsRepository = getRepository(regions);

  return await regionsRepository.findOne({
    id: idRegion
  });
};
