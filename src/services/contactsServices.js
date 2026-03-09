import Contact from "../db/models/contact.js";

export const listContacts = (where) => Contact.findAll({ where });

export const getContactByID = (where) => Contact.findOne({ where });

export const addContact = (data) => Contact.create(data);

export const removeContact = async (where) => {
  const contact = await getContactByID(where);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateContactById = async (where, data) => {
  const contact = await getContactByID(where);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (where, data) => {
  const contact = await getContactByID(where);
  if (!contact) return null;
  await contact.update({
    favorite: data.favorite,
  });
  return contact;
};
