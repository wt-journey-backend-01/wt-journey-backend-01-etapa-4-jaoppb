"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var authRepository_exports = {};
__export(authRepository_exports, {
  default: () => authRepository_default
});
module.exports = __toCommonJS(authRepository_exports);
var import_db = __toESM(require("../db/db"));
var import_bcrypt = require("bcrypt");
var import_jsonwebtoken = require("jsonwebtoken");
async function register(userData) {
  const user = await (0, import_db.default)("usuarios").where({ email: userData.email }).first();
  if (user) throw new Error("User already exists");
  const encrypetedPasssword = (0, import_bcrypt.hashSync)(userData.password, 10);
  userData.password = encrypetedPasssword;
  return (0, import_db.default)("usuarios").insert(userData);
}
async function login(credentials) {
  const { username, password } = credentials;
  const user = await (0, import_db.default)("usuarios").where({ username }).first();
  if (!user) throw new Error("Invalid credentials");
  const isValidPassword = (0, import_bcrypt.compareSync)(password, user.password);
  if (!isValidPassword) throw new Error("Invalid credentials");
  const token = (0, import_jsonwebtoken.sign)(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return { token };
}
function logout(token) {
  return "User logged out successfully";
}
function deleteUser(userId) {
  return (0, import_db.default)("usuarios").where({ id: userId }).del();
}
var authRepository_default = {
  register,
  login,
  logout,
  deleteUser
};
