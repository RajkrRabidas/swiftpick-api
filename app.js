const { dbConnect, getData } = require("./controller/dbcontroller");
const express = require("express");
const app = express();

// Connect to MongoDB
dbConnect();

app.get("/", (req, res) => {
    res.send("Welcome to the Swiftcart API");
});

// Get all categories
app.get("/categories", async (req, res) => {
    try {
        let query = {};
        let collection = "category";
        let output = await getData(collection, query);
        res.send(output);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch categories" });
    }
});


// Get a single category by ID
app.get('/categories/:name', async (req, res) => {
    try {
        let name = req.params.name;
        let query = { name: name };
        let collection = "category";
        let output = await getData(collection, query);
        res.send(output);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch category" });
    }
});


// Get all products
app.get("/products", async (req, res) => {
    try {
        let query = {};
        let collection = "products";
        let output = await getData(collection, query);
        res.send(output);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch products" });
    }
});


// Get a single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let query = { _id: id }; 
        let collection = "products";
        let output = await getData(collection, query);
        res.send(output);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch product" });
    }
});


// Get products by category
app.get('/products/category/:category', async (req, res) => {
    try {
        let category = req.params.category;
        let query = { category: category };
        let collection = "products";
        let output = await getData(collection, query);
        res.send(output);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch products by category" });
    }
});


// Get products by price range
app.get('/products/price/:min/:max', async (req, res) => {
    try {
        let min = Number(req.params.min);
        let max = Number(req.params.max);
        let query = { price: { $gte: min, $lte: max } };
        let collection = "products";
        let output = await getData(collection, query);
        res.send(output);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch products by price range" });
    }
});


app.listen(3000, function () {
    dbConnect();
    console.log("App running on port 3000");
});
