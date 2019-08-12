var mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
    accountType: {
        type: String,
        trim: true,
    },

    name :{
        type : String,
        trim: true,
    },
    email :{
        type : String,
        trim: true,
    },
    password : {
        type : String, 
        trim : true
    },
    mobile:{
        type: String,
        trim:true
    },
    storeName:{
        type: String,
        trim: true
    },
    storeEmail:{
        type: String,
        trim: true
    },
    storeMobile:{
        type: String,
        trim: true
    },
    image:{
        type: String,
        default: null
    },
    streetName:{
        type: String, 
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    zipCode:{
        type: String,
        trim: true
    },
    city:{
        type: String, 
        trim: true
    },
    createdAt : {
        type: String,
        default: new Date()
    },
    
    adminStatus : {type : String, default : null},

    status : {
        activeEmailToken : {type : Number},
        activeEmail : {type:Boolean, default: false},
        resetPassToken : {type: Number, default: null},
    },
    productId : [{type: ObjectId, ref: 'product',default: null}],

},{usePushEach: true})

var user = mongoose.model('user', userSchema);

module.exports = user;