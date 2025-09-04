"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var user_exports = {};
__export(user_exports, {
  seed: () => seed
});
module.exports = __toCommonJS(user_exports);
async function seed(knex) {
  await knex("usuarios").del();
  await knex("usuarios").insert([
    {
      nome: "Admin User 1",
      email: "admin1@example.com",
      senha: "$2a$12$A2gmGyy2SesC/eb6cq7HRu3SxFHan3bc2h/Ku3Rq2JiWeV8wTQRcC"
    },
    {
      nome: "Admin User 2",
      email: "admin2@example.com",
      senha: "$2a$12$A2gmGyy2SesC/eb6cq7HRu3SxFHan3bc2h/Ku3Rq2JiWeV8wTQRcC"
    },
    {
      nome: "Admin User 3",
      email: "admin3@example.com",
      senha: "$2a$12$A2gmGyy2SesC/eb6cq7HRu3SxFHan3bc2h/Ku3Rq2JiWeV8wTQRcC"
    }
  ]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  seed
});
