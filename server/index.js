"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const {
  getItems,
  getCompanies,
  getItemById,
  getCompanyById,
  getCompanyByName,
  getItemByCategory,
  getItemByBody,
  addOrder,
  addToCart,
  getCart,
  deleteItemInCart,
  clearCart
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/api/get-items", getItems)
  .get("/api/get-companies", getCompanies)
  .get("/api/get-item/:itemId", getItemById)
  .get("/api/get-item/by-category/:category", getItemByCategory)
  .get("/api/get-item/by-body/:body", getItemByBody)
  .get("/api/get-company/:companyId", getCompanyById)
  .get("/api/get-company/by-name/:name", getCompanyByName)
  .post("/api/add-order", addOrder)
  .post("/api/add-to-cart", addToCart)
  .get("/api/get-cart", getCart)
  .delete("/api/delete-item/:itemId", deleteItemInCart)
  .delete("/api/clear-cart", clearCart)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
