import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;

  const contacts = await contactsService.listContacts({ owner });
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id: owner } = req.user;

  const { id } = req.params;
  const result = await contactsService.getContactByID({ id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsService.removeContact({ id, owner });
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsService.updateContactById(
    { id, owner },
    req.body,
  );
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

export const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsService.updateStatusContact(
    { id, owner },
    req.body,
  );

  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};
