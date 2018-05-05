<template>
  <div>
    <nav-header></nav-header>
    <div class="detail-box" v-for="item in detail">


    <div  class="left-box">
      <img v-bind:src="'static/'+item.productImage" alt="">
    </div>
    <div class="right-box">
          <div class="right-child">
          <p class="d-name">{{item.productName}}</p>
          <div class="d-price">
            <p>价格：</p>
            <p>￥{{item.salePrice}}</p>
          </div>
          <div class="p-small">
            <p>数量：</p>
            <input class="p-count" value="1" readonly="readonly">
            <span class="p-count-btn plus" data-opera-type="plus">+</span>
            <span class="p-count-btn minus" data-opera-type="minus">-</span>
          </div>
            <div class="addCart">
              <a href="javascript:;" @click="addCart(item.productId)">加入购物车</a>
            </div>
          </div>
    </div>


    </div>
    <modal v-bind:mdShow="mdshow" v-on:close="closeModel">
          <p slot="message">
            请先登陆否则无法加入购物车中
          </p>
          <div slot="btn">
            <a  class="btn-n" @click="mdshow=false">关闭</a>
          </div>
    </modal>
    <modal v-bind:mdShow="mdshow02" v-on:close="closeModel">
      <p slot="message">
            加入购物车成功！
      </p>
      <div slot="btn">
        <a  class="btn-n" @click="mdshow02=true">继续购物</a>
        <router-link class="btn-n" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
   import NavHeader from './../components/Header'
   import NavFooter from './../components/Footer'
   import Modal     from './../components/Model'
   import axios from 'axios'
   export default{
          data () {
              return {
                productId:'',
                detail:[],
                mdshow:true,
                mdshow02:true
              }
          },
          mounted () {
            this.getDetail();
          },
         components: {
            NavHeader,
            NavFooter,
            Modal
          },
          methods: {
            getDetail() {
               var param = {
                 productId : this.$route.params.goodsId
               }
               console.log(param);
              axios.get('/goods/goodDetail',{
                params : param
              }).then((respones) => {
                let res = respones.data;
                if (res.status == '0') {
                  this.detail = res.result.list;
                }else {
                  this.detail = [];
                }
              })
            },
            addCart(productId){
              axios.post("/goods/addCart",{
                productId:productId
              }).then((res)=>{
                var res = res.data;
              if(res.status==0){
                this.mdshow02 = false
              }else{
                this.mdshow = false
              }
            })
            },
            closeModel () {
              this.mdshow = true;
            }
          }
   }
</script>

<style scoped>
  img {
    width:100px;
    height:100px;
  }
  .detail-box {
    min-height: 480px;
    width: 82%;
    margin:20px auto;
  }
  .p-count{
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    width: 45px;
    text-align: center;
    outline: none;
    border: 1px solid #aaa;
  }
  .p-count-btn{
    position: absolute;
    left: 115px;
    display: block;
    width: 20px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    text-align: center;
    border: 1px solid #aaa;
    background: #fff;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .plus {
    top:0
  }
  .minus {
    bottom:0
  }
  .p-small {
    position: relative;
    margin-top:150px;
  }
  .left-box {
    width: 40%;
    float:left;
  }
  .right-box {
    width: 60%;
    float:right;
  }
  .left-box img {
    width:100%;
    height:100%;
  }
  .right-child {
    padding-left: 30px;
  }
  .d-name {
    font-size: 20px;
    color: #333;
  }
  .d-price p:nth-child(1),.p-small p{
    display: inline-block;
    width: 50px;
    color: #999;
  }
  .d-price {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #eee;
    margin-top: 20px;
    padding:10px;
  }
  .d-price p:nth-child(2) {
    display: inline-block;
    font-size: 18px;
    color: #c60023;
  }
  .addCart {
    width:120px;
    height: 45px;
    background-color:#ff5482;
    margin-top:30px;
    border-radius: 3px;
  }
  .addCart a {
    display:inline-block;
    width:100%;
    height: 100%;
    color:#fff;
    font-size:16px;
    line-height: 45px;
    text-align: center;
  }
  .addCart:hover {
    background-color: red;
  }
  .addCart:active {
    background-color: #fd8f82;
  }
</style>
