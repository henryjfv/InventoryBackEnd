import { matchedData } from "express-validator";
import { CompanyModel } from "../models/index.js";
import { handleHttpError } from "../utils/handleError.js";

export const getItems = async (req, res) => {
  try {
    const data = await CompanyModel.find({});
    res.status(200);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

export const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await CompanyModel.findOneData(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

export const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const deleteResponse = await CompanyModel.findByIdAndRemove(id);
    const data = {
      deleted: deleteResponse > 0,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    let data = await CompanyModel.findByIdAndUpdate(id, { ...body });
    data = {
      updated: data > 0,
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

export const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await CompanyModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};
