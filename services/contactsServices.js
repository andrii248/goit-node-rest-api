import { nanoid } from "nanoid";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const contactsPath = resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactByID = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;
  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
};

export const updateContactById = async (contactId, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;
  contacts[idx] = { ...contacts[idx], ...data };
  await updateContacts(contacts);
  return contacts[idx];
};
