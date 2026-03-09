import Contact from "./models/contact.js";
import User from "./models/User.js";

User.hasMany(Contact, { foreignKey: "owner" });
Contact.belongsTo(User, { foreignKey: "owner" });
