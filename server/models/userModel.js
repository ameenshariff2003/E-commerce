const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new Schema({
    name:{
        type:String,
        require:true,

    },
    email:{
        type: String,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
        type:Array,
        default:[],
    },

},{
    timestamps:true
});

const Users = mongoose.model('Users',userSchema);

module.exports = Users;