const companies = require("./data/companies.json");
const items = require("./data/items.json");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// stringifies _id numbers in both collections

const allItems= [];
const allCompanies = [];

items.forEach((item) => {
    allItems.push({
    name: item.name,
    price: item.price,
    body_location: item.body_location,
    category: item.category,
    _id: item._id.toString(),
    imageSrc: item.imageSrc,
    numInStock: item.numInStock,
    companyId: item.companyId.toString(),
    });
});

companies.forEach((item) => {
    allCompanies.push({
    name: item.name,
    url: item.url,
    country: item.country,
    _id: item._id.toString(),
    });
});

// imports all the data to MongoDB
// also creates index for category field to be able to query on pets and animals category
const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("e-commerce");

    try {
        // await db.collection("items").createIndex( { category: "text" } )
        await db.collection("items").insertMany( allItems );
        await db.collection("companies").insertMany( allCompanies );
    console.log("success")
    } catch (err) {
        console.log(err)
    } finally {
        client.close();
    }
};

batchImport();