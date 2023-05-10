import { matchedData } from "express-validator";
import { InventoryModel } from "../models/index.js";
import { handleHttpError } from "../utils/handleError.js";
import { printer } from '../utils/makePdf.js';
import fs from 'fs';

export const getItems = async (req, res) => {
  try {
    req = matchedData(req);
    const { companyId } = req;
    const data = await InventoryModel.find()
      .where("companyId")
      .equals(companyId)

    res.status(200);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

export const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const deleteResponse = await InventoryModel.findByIdAndRemove(id);
    const data = {
      deleted: deleteResponse > 0,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

export const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await InventoryModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

export const sendPdfToEmail = async (req, res) => {
  try {
    const { email, companyName, companyId } = matchedData(req);

    const inventoryData = await InventoryModel.find()
      .where("companyId")
      .equals(companyId)
      .select("product total")

    if (inventoryData.length > 0) {

      let content = []
      for (const key in inventoryData) {
        content.push({ 'product': inventoryData[key].get('product'), 'total': inventoryData[key].get('total') })
      }

      let response = ''
      printer(content, companyName, email)
      res.status(200)
      res.send({ message: response ?? 'Something went wrong' });
    } else {
      res.status(404)
      res.send({ message: 'The inventory f this company is empty' });
    }

  } catch (e) {
    handleHttpError(res, "ERROR_SENDING_EMAIL");
  }
};

export const downloadPdf = async (req, res) => {
  try {
    const { companyName, companyId } = matchedData(req);
    console.log("🚀 ~ file: inventory.js:82 ~ downloadPdf ~ companyName:", companyName)
    console.log("🚀 ~ file: inventory.js:82 ~ downloadPdf ~ companyId:", companyId)
    const inventoryData = await InventoryModel.find()
      .where("companyId")
      .equals(companyId)
      .select("product total")

    if (inventoryData.length > 0) {

      let content = []
      for (const key in inventoryData) {
        content.push({ 'product': inventoryData[key].get('product'), 'total': inventoryData[key].get('total') })
      }

      let response = await printer(content, companyName)
      res.status(response.status)
      setTimeout(() => {
        fs.readFile(response.pathFile, (err, file) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Could not download file');
          }

          res.setHeader('Content-Type', 'application/pdf');

          res.send(file);
          setTimeout(() => {
            //Delete file
            fs.unlinkSync(response.pathFile)

          }, 3000);
        });
      }, 500);
    } else {
      res.status(404)
      res.send({ message: 'The inventory f this company is empty' });
    }

  } catch (e) {
    console.log("🚀 ~ file: inventory.js:104 ~ downloadPdf ~ e:", e)

    handleHttpError(res, "ERROR_SENDING_EMAIL");
  }
};
