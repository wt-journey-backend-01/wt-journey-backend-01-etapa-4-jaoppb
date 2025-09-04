"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_docsRouter = __toESM(require("./routes/docsRouter"));
var import_agentesRoutes = __toESM(require("./routes/agentesRoutes"));
var import_casosRoutes = __toESM(require("./routes/casosRoutes"));
var import_utils = require("./utils");
const app = (0, import_express.default)();
const PORT = process.env.PORT || 3e3;
app.use(import_express.default.json());
app.use(import_docsRouter.default);
app.use(import_agentesRoutes.default);
app.use(import_casosRoutes.default);
app.use(import_utils.errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
