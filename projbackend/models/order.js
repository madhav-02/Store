const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;

const ProductsInCartSchema = new mongoose.Schema({
    product  : {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number,

});

const ProductCart = mongoose.model("ProductCart",ProductsInCartSchema)

const orderSchema = new mongoose.Schema({
    products : [ProductsInCartSchema], // If we observe carefully in any website like flipkart etc, the orders page consists of the products ordered along with some other properties. SO we create a new schema for the products that are present in the order page. This will differ from the schema of the original product. Also it isa an array of products.
    transaction_id : {}, // Each trans. has an id corresponding to it.
    amount: {type: Number},
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true});


const Order = mongoose.model("Order",orderSchema);

module.exports = {Order,ProductCart};
