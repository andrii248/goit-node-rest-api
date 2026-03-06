import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactByID(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) throw HttpError(404, `Contact with id=${id} was not found`);
  res.json(result);
};

export const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContactById(id, req.body);
  if (!result) throw HttpError(404, `Contact with id=${id} not found`);
  res.json(result);
};

export const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateStatusContact(id, req.body);
  if (!result) throw HttpError(404);
  res.json(result);
};
