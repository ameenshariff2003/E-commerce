const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name:{
        type:String,
        requird : true,
        trim : true,
        unique:true

    }
},{
    timestamps:true
})


module.exports = mongoose.model("Category",categorySchema);