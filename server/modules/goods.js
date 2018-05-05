var mongoose = require('mongoose')
//用来定义表模型
var Schema = mongoose.Schema;
var ProductSch = new Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "productImage":String,
    "checked":String,
    "productNum":Number
});

module.exports = mongoose.model("Good",ProductSch)

