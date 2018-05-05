var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../modules/goods');


//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/zwy');

mongoose.connection.on("connected",function () {
    console.log("success");
})
mongoose.connection.on("error",function () {
    console.log("error");
})
mongoose.connection.on("disconnected",function () {
    console.log("disconnected");
})

//所有
router.get("/",function (req,res,next) {
    let sort = parseInt(req.param('sort'));
    let pageSize = parseInt(req.param("pageSize"));
    let kindChecked = req.param("kindChecked");
    let page = req.param("page");
    let skip = (page-1)*pageSize;  //跳过多少条
    let params = {};
    if (kindChecked!= "All") {
      switch (kindChecked){
        case '0':params = {Recommend:{$gt:0}};break;
        case '1':params = {Discount:{$gt:0}};break;
      }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)   //链式查询要用exec方法结尾
        goodsModel.sort({"salePrice":sort})  //按照salePrice的大小来排序
        goodsModel.exec(function(err,doc) {
        if (err) {
            res.json({
                status:"1",
                msg:'err.message'
            });
        }else {
            res.json({
                status:"0",
                msg:'',
                result:{
                   count:doc.length,
                   list:doc
                }
            })
        }
    })
})
//详情
router.get("/goodDetail",function (req,res,next) {
  let productId = req.param('productId');
  Goods.find({productId:productId},function(err,doc) {
    if (err) {
      res.json({
        status:"1",
        msg:'err.message'
      });
    }else {
      res.json({
        status:"0",
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})
//加入购物车
router.post("/addCart", function (req,res,next) {
  var userId = '10000001',productId = req.body.productId;
  var User = require('../modules/user');
  User.findOne({userId:userId}, function (err,UserDoc) {
      if(err) {
        res.json({
          status:'1',
          msg:'error'
        })
      }else {
        //拿到用户了
        if(UserDoc) {
          let goodItem = '';
          //看是否已经有了商品 有了就直接加数量
          UserDoc.cartList.forEach(function (item) {
              if (item.productId == productId) {
                goodItem = item;
                item.productNum ++;
              }
          });
          if (goodItem) {
            UserDoc.save(function (err2,doc2) {
              if(err2) {
                res.json( {
                  status:'1',
                  msg:err2.message
                })
              }else {
                res.json({
                  status:'0',
                  msg:'',
                  result:'success'
                })
              }
            })
          }else {
            Goods.findOne({productId:productId},function (err,doc) {
              if (err) {
                res.json({
                  status:'1',
                  msg:""
                })
              } else {
                //找到了
                if(doc) {
                  console.log(11111);
                  console.log(doc);
                  doc.productNum = 1;
                  doc.checked = 1;
                  UserDoc.cartList.push(doc);
                  UserDoc.save(function (err2,doc2) {
                    if(err2) {
                      res.json( {
                        status:'1',
                        msg:err2.message
                      })
                    }else {
                      res.json({
                        status:'0',
                        msg:'',
                        result:'success'
                      })
                    }
                  })
                }
              }
            })
          }

        }
      }

  })
});



module.exports = router;
