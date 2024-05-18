import Contact from "../models/Contact.js";

export const listContacts = (search = {}) => {
  const { filter = {} } = search;
  return Contact.find(filter);
};

export const getContactById = async (_id) => {
  const result = await Contact.findById(_id);
  return result;
};

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const addContact = (data) => Contact.create(data);

export const updateById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });


