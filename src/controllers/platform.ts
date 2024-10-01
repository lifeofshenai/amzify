// backend/controllers/vendors.ts
import {Request, Response} from "express";
import {HTTP_STATUS} from "../utils/constants/statusCodes";
import {sendErrorResponse, sendSuccessResponse} from "../utils/server";
import {IPlatform} from "../models/Platform";
import PlatformService from "../services/config/PlatformService";

export const createPlatform = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const payload = req.body;

    const platform: IPlatform = await PlatformService.createPlatform(payload);

    sendSuccessResponse(
      res,
      HTTP_STATUS.CREATED_201,
      {platform},
      "Platform created successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const getPlatforms = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const platforms: IPlatform[] = await PlatformService.getPlatforms();
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {platforms},
      "Platforms retrieved successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const getPlatformById = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params;
    const platform: IPlatform = await PlatformService.getPlatformById(id);
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {platform},
      "Platform retrieved successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const updatePlatform = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params;
    const payload = req.body;
    const platform: IPlatform = await PlatformService.updatePlatform(
      id,
      payload
    );
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {platform},
      "Platform updated successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
