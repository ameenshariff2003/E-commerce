const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema({

    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true,

    },
    price: {
        type: Number,
        trim: true,
        required: true

    },
    description: {
        type: String,
        required: true,

    },
    image: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        require: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0

    }

}, 
{ 
    timestamps: true 
}
)
const Product = mongoose.model('Product', productModel);
module.exports = Product;