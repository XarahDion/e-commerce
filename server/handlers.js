"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/// returns all items
const getItems = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("e-commerce");
        let result = await db.collection("items").find().toArray();
        res.status(200).json({ status: 200, data: result })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
    client.close();
    }
};

/// returns all companies
const getCompanies = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce");
        let result = await db.collection("companies").find().toArray();
    result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        console.log(err.stack)
    } finally {
    client.close();
    }
};

/// returns a single item by its _id
const getItemById = async (req, res) => {
    const _id = req.params.itemId ;
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce");
        let result = await db.collection("items").findOne({ _id })
    result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        console.log(err.stack)
    } finally {
    client.close();
    }
};

/// returns a single company by _id
const getCompanyById = async (req, res) => {
    const _id = req.params.companyId ;
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce");
        let result = await db.collection("companies").findOne({ _id })
    result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        console.log(err.stack)
    } finally {
    client.close();
    }
};

/// returns a single company by name
const getCompanyByName = async (req, res) => {
    const name = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1) ;
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce");
        let result = await db.collection("companies").findOne({ name })
    result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        console.log(err.stack)
    } finally {
    client.close();
    }
};

// returns all items with same category value
const getItemByCategory = async (req, res) => {
    const category = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1) ;
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce");
        let result = await db.collection("items").find({ $text: { $search: category } }).toArray()
    result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        console.log(err.stack)
    } finally {
    client.close();
    }
};

// returns all items with same body_location value
const getItemByBody = async (req, res) => {
    const body_location = req.params.body.charAt(0).toUpperCase() + req.params.body.slice(1) ;
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce"); 
        let result = await db.collection("items").find({ body_location }).toArray()
    result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        console.log(err.stack)
    } finally {
    client.close();
    }
};

/// creates a new order
const addOrder = async (req, res) => {
    const info = req.body
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce");
        const result = await db.collection("orders").insertOne({
            _id: uuidv4(),
            order: info.order,
            total: info.total,
            firstName: info.firstName,
            lastName: info.lastName,
            email: info.email,
            phone: info.phone,
            address: info.address,
            postalCode: info.postalCode,
            creditCard: info.creditCard,
            expiration: info.expiration
        });
        res.status(201).json({ status: 201, data: result})
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {     
    client.close();
    }
};

/// adds items to cart
const addToCart = async (req, res) => {
    const info = req.body
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("e-commerce");
        const result = await db.collection("cart").insertOne({ itemId: info.itemId });
        res.status(201).json({ status: 201, data: result})
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
        console.log(err.stack)
    } finally {     
    client.close();
    }
};

/// returns the content of the cart
const getCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("e-commerce");
        let result = await db.collection("cart").find({ itemId: { $exists: true } }).toArray();
        res.status(200).json({ status: 200, data: result.map((field) => field.itemId ) })
    } catch (err) {
        res.status(404).json({ status: 404, data: "Not Found" });
    } finally {
    client.close();
    }
};

/// deletes one item in cart by its itemId
const deleteItemInCart = async (req, res) => {
    const itemId = req.params.itemId ;
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce");
        console.log(itemId)
        const result = await db.collection("cart").deleteOne({ itemId : itemId});
        if (!result.deletedCount) {
            return res.status(400).json({ status: 404, data: itemId, message: "Cannot delete this item."})
        }
        if (result.deletedCount) {
            return res.status(201).json({ status: 204, itemId, data: result})
        }
    } catch (err) {
        console.log(err.stack)
    } finally {
        client.close();
    }
};

/// deletes all items in cart
const clearCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try { 
        await client.connect();
        const db = client.db("e-commerce");
        const result = await db.collection("cart").deleteMany({});
        if (!result.deletedCount) {
            return res.status(400).json({ status: 404, message: "Cannot clear collection."})
        }
        if (result.deletedCount) {
            return res.status(201).json({ status: 204, data: result})
        }
    } catch (err) {
        console.log(err.stack)
    } finally {
        client.close();
    }
};

module.exports = {
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
};
