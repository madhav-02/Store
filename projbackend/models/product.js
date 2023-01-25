const mongoose = require ("mongoose");
const {ObjectId} = mongoose.Schema 
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description:{
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price : {
        type: Number,
        required: true,
        maxlength: 32,
        tri: true
    },
    category : {
        type: ObjectId,
        ref: "Category",
        required: true
    },

    stock: {             // No of available items
        type: Number
    },
    sold: {              // No of items sold
        type: Number,
        default: 0
    },
    photo: {           // To store images of the products
        data: Buffer, // Idk why it is used this way. Need to do more research
        contentType: String
    },

}, {timestamps : true});

module.exports = mongoose.model("Product",productSchema);