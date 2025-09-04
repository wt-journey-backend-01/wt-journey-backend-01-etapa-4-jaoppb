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
var authRoutes_exports = {};
__export(authRoutes_exports, {
  authApi: () => authApi,
  default: () => authRoutes_default
});
module.exports = __toCommonJS(authRoutes_exports);
var import_express = __toESM(require("express"));
var import_authController = __toESM(require("../controllers/authController"));
const router = import_express.default.Router();
const registerApi = {
  summary: "User registration route",
  responses: {
    201: {
      description: "User successfully registered"
    }
  }
};
router.post("/auth/register", import_authController.default.register);
const loginApi = {
  summary: "User login route",
  responses: {
    200: {
      description: "Successful login"
    }
  }
};
router.post("/auth/login", import_authController.default.login);
const deleteUserApi = {
  summary: "Delete user route",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string" }
    }
  ],
  responses: {
    204: {
      description: "User successfully deleted"
    }
  }
};
router.delete("/users/:id", import_authController.default.deleteUser);
const logoutApi = {
  summary: "User logout route",
  responses: {
    204: {
      description: "User successfully logged out"
    }
  }
};
router.post("/auth/logout", import_authController.default.logout);
const authApi = {
  "/auth/register": {
    post: registerApi
  },
  "/auth/login": {
    post: loginApi
  },
  "/auth/logout": {
    post: logoutApi
  },
  "/users/{id}": {
    delete: deleteUserApi
  }
};
var authRoutes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authApi
});
