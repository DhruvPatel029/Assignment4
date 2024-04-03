//  Add the following declaration at the top of .js files
// /********************************************************************************** 
//  * ITE5315 – Assignment 4* I declare that this assignment is my own work in accordance with Humber Academic Policy.
//  * * No part of this assignment has been copied manually or electronically from any other source* 
//  * (including web sites) or distributed to other students.
//  Name: Dhruv BipinBhai Patel Student ID:N01578896 Date:3/28/2024
//  * *******************************************************************************




var express = require('express');
var mongoose = require('mongoose');
var app = express();
var database = require('./config/database');
var bodyParser = require('body-parser');
const exphbs = require('express-handlebars');


var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Employee = require('./models/employee');




const Product = require('./models/product');




app.get('/', async function (req, res) {
    console.log("welcome");
});
//get all employee data from db
app.get('/api/employees ', async function (req, res) {
    const allEmps = await Employee.find();

    res.json(allEmps);
});

//get all product data from db
app.get('/api/products', async function (req, res) {
    const products = await Product.find();

    res.json(products);
});


// get a employee with ID of 1
app.get('/api/employees/:employee_id', async function (req, res) {
    let id = req.params.employee_id;

    const emp = await Employee.findById(id);

    res.json(emp);

});

// get a employee with ID of 1
app.get('/api/products/:product_id', async function (req, res) {
    let id = req.params.product_id;
    const product = await Product.findById(id);
    res.json(product);
});

// create employee and send back all employees after creation
app.post('/api/employees', async function (req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

    const emp = new Employee({
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    });

    await emp.save();

    const allEmps = await Employee.find();

    res.json(allEmps);

});

app.delete('/employees/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        res.json(deletedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
// create product and send back all products after creation
app.post('/api/products', async function (req, res) {
    console.log(req.body);

    const product = new Product({
        asin: req.body.asin,
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        stars: +req.body.stars,
        reviews: +req.body.reviews,
        price: +req.body.price,
        listPrice: +req.body.listPrice,
        categoryName: req.body.categoryName,
        isBestSeller: req.body.isBestSeller,
        boughtInLastMonth: +req.body.boughtInLastMonth
    });

    await product.save();

    const products = await Product.find();

    res.json(products);

});

// create employee and send back all employees after creation
app.put('/api/employees/:employee_id', async function (req, res) {
    // create mongose method to update an existing record into collection
    console.log(req.body);

    let id = req.params.employee_id;
    var data = {
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    }

    // save the user
    await Employee.findByIdAndUpdate(id, data);
    res.send('Successfully! Employee updated - ' + req.body.name);
});

// create product and send back all products after creation
app.put('/api/products/:product_id', async function (req, res) {
    // create mongose method to update an existing record into collection
    console.log(req.body);

    let id = req.params.product_id;

    var data = {
        asin: req.body.asin,
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        stars: req.body.stars,
        reviews: req.body.reviews,
        price: req.body.price,
        listPrice: req.body.listPrice,
        categoryName: req.body.categoryName,
        isBestSeller: req.body.isBestSeller,
        boughtInLastMonth: req.body.boughtInLastMonth
    }

    // save the user
    await Product.findByIdAndUpdate(id, data);
    res.send('Successfully! Product updated - ' + req.body.asin);
});

// delete a employee by id
app.delete('/api/employees/:employee_id', async function (req, res) {
    console.log(req.params.employee_id);
    let id = req.params.employee_id;
    await Employee.deleteOne({ _id: id });
    res.send('Successfully! Employee has been Deleted.');
});

// delete a product by id
app.delete('/api/products/:product_id', async function (req, res) {
    console.log(req.params.product_id);
    let id = req.params.product_id;
    await Product.deleteOne({ _id: id });
    res.send('Successfully! Product has been Deleted.');
});

app.listen(port);
console.log("App listening on port : " + port);
