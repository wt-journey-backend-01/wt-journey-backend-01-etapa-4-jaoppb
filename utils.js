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
var utils_exports = {};
__export(utils_exports, {
  errorHandler: () => errorHandler,
  parseId: () => parseId
});
module.exports = __toCommonJS(utils_exports);
var import_zod = require("zod");
var import_notFound = require("./errors/notFound");
var import_requiredParam = require("./errors/requiredParam");
var import_invalidID = require("./errors/invalidID");
var import_futureDate = require("./errors/futureDate");
function handleZodIssue(issue) {
  return {
    [issue.path.join(".")]: {
      message: issue.message,
      code: issue.code,
      input: issue.input
    }
  };
}
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  switch (true) {
    case err instanceof import_zod.ZodError:
      return res.status(400).json({
        message: "Par\xE2metros inv\xE1lidos",
        errors: err.issues.map(handleZodIssue)
      });
    case (err instanceof import_notFound.NotFoundError || err instanceof import_invalidID.InvalidIDError):
      return res.status(404).json({
        message: err.message
      });
    case (err instanceof import_requiredParam.RequiredParamError || err instanceof import_futureDate.FutureDateError):
      return res.status(400).json({
        message: err.message
      });
    default:
      return res.status(500).json({
        message: "Internal server error"
      });
  }
}
function parseId(entityName, id) {
  if (!id) {
    throw new import_requiredParam.RequiredParamError("id");
  }
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId) || parsedId <= 0) {
    throw new import_invalidID.InvalidIDError("Entity", parsedId);
  }
  const isFloat = id.includes(".");
  if (isFloat) {
    throw new import_invalidID.InvalidIDError(entityName, parsedId);
  }
  return parsedId;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandler,
  parseId
});
