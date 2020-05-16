const express = require("express");
const AUTH = require("../libs/jwtAuth");
const ControllerFinance = require("../Controllers/finance");
const Router = express.Router();

Router.get("/income-all", ControllerFinance.GET_ALL_INCOME);
Router.post("/add-income", AUTH, ControllerFinance.ADD_NEW_INCOME);
Router.get("/spending-all", ControllerFinance.GET_ALL_SPENDING);
Router.post("/add-spending", AUTH, ControllerFinance.ADD_SPENDING);
Router.get("/cash-flow", ControllerFinance.CASH_FLOW);
Router.delete("/income-delete/:id?", AUTH, ControllerFinance.INCOME_DELETE);
Router.delete("/spending-delete/:id?", AUTH, ControllerFinance.SPENDING_DELETE);
Router.patch("/income-update/:id?", AUTH, ControllerFinance.INCOME_UPDATE);
Router.patch("/spending-update/:id?", AUTH, ControllerFinance.SPENDING_UPDATE);
module.exports = Router;
