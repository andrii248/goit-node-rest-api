import Contact from "../db/models/contact.js";

export const listContacts = () => Contact.findAll();

export const getContactByID = (id) => Contact.findByPk(id);

export const addContact = (data) => Contact.create(data);

export const removeContact = async (contactId) => {
  const contact = await getContactByID(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateContactById = async (contactId, data) => {
  const contact = await getContactByID(contactId);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (contactId, data) => {
  const contact = await getContactByID(contactId);
  if (!contact) return null;
  await contact.update({
    favorite: data.favorite,
  });
  return contact;
};
