<template>
  <div>
    <nav-header></nav-header>

    <div class="pay-wrap w">
      <p class="pay-tips">订单提交成功，<span class="red">￥{{orderTotal}}</span> 请您尽快支付！ 订单号：{{orderId}}</p>
      <p class="pay-tips enhance">请使用支付宝扫描如下二维码进行支付：</p>
      <div class="img-con">
        <img class="qr-code" src="http://img.happymmall.com/qr-1525069541676.png">
      </div>
    </div>

    <div class="order">
      <div class="btn-l">
        <router-link class="btn-back" to="/cart">购物车</router-link>
      </div>
      <div class="btn-r">
        <router-link class="btn-back" to="/">首页</router-link>
      </div>
    </div>


    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/success.css'
  import NavHeader from './../components/Header'
  import NavFooter from './../components/Footer'
  import axios from 'axios'
  export default {
    data () {
      return {
        orderId:'',
        orderTotal:0
      }
    },
    mounted () {
      this.init();
    },
    components: {
      NavHeader,
      NavFooter
    },
    methods: {
      init() {
        var orderId = this.$route.query.orderId;
        console.log("orderId:"+orderId);
        if(!orderId){
          return;
        }
        axios.get("/users/orderDetail",{
          params:{
            orderId:orderId
          }
        }).then((response)=>{
          let res = response.data;
        if(res.status=='0'){
          this.orderId = orderId;
          this.orderTotal = res.result.orderTotal;
        }
      });
      }
    }
  }
</script>

<style scoped>
    .order {
      text-align: center;
    }
    .btn-l,.btn-r {
      display: inline-block;
      margin:0 40px;
    }
    .btn-back {
      display: inline-block;
      color:#fff;
      background-color: red;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
    .btn-back:hover{
      background-color: #fd8f82;
    }
  .red{
    color:#c60023;
  }
</style>
