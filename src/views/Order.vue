<template>
  <div>
    <nav-header></nav-header>
    <div class="confirm-wrap w">
    <div class="pane ">
      <h2 class="panel-title">商品清单</h2>
      <div class="panel-body order-product">
        <table class="product-table" >
          <tbody>
          <tr>
            <th width="10%">&nbsp;</th>
            <th width="30%" align="left">商品描述</th>
            <th width="20%" align="center">价格</th>
            <th width="20%" align="center">数量</th>
            <th width="20%" align="center">小计</th>
          </tr>
          <tr v-for="item in cartList" v-if="item.checked=='1'">
            <td class="product-cell cell-img">
            <a >
              <img class="p-img" v-bind:src="'static/'+item.productImage">
            </a>
            </td>
            <td align="left">
              <a class="detail">
                {{item.productName}}
              </a>
            </td>
            <td align="center">￥{{item.salePrice}}</td>
            <td align="center">x{{item.productNum}}</td>
            <td align="center">￥{{item.salePrice*item.productNum}}</td>
          </tr>
          </tbody>
        </table>
        <div class="submit-con">
          <span>订单总价：</span>
          <span class="submit-total">￥{{total}}</span>
          <span class="btn order-submit"  @click="payMent">提交订单</span>
        </div>
      </div>
    </div>
   </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/order.css'
  import NavHeader from './../components/Header'
  import NavFooter from './../components/Footer'
  import Modal     from './../components/Model'
  import axios from 'axios'

  export default {
    data () {
      return {
        cartList:[]
      }
    },
    computed: {
      total () {
        var money = 0;
        this.cartList.forEach((item) => {
          if(item.checked == '1')
        {
          money += parseFloat(item.salePrice) * parseInt(item.productNum);
        }
      })
        return money;
      }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
          axios.get("/users/cartList").then((response)=>{
            let res = response.data;
          this.cartList = res.result;
//
//          this.cartList.forEach((item)=>{
//            if(item.checked=='1'){
//            this.subTotal += item.salePrice*item.productNum;
//          }
//        });
//
//          this.orderTotal = this.subTotal+this.shipping-this.discount+this.tax;
        });
        },
      payMent () {
        var addressId = this.$route.query.addressId;
        axios.post("/users/payMent",{
          addressId:addressId,
          orderTotal:this.total
        }).then((response)=>{
          let res = response.data;
        if(res.status=="0"){
          this.$router.push({
            path:'/success?orderId='+res.result.orderId
          })
        }
      })
      }
    },
    components: {
      NavHeader,
      NavFooter,
      Modal
    }
  }
</script>

<style scoped>
 .panel-title {
   color:#000000;
   font-size: 20px;
   font-weight: 700;
 }
  .detail{
    font-size:12px;
    color:#000;
  }
  th {
    text-align: center;
  }
  .submit-con {
    background-color: #eee;
    height: 46px;
    line-height: 46px;
  }
  .order-submit {
    display: inline-block;
    width:100px;
    height: 100%;
    background-color: red;
    color:#ffffff;
    text-align: center;
    cursor: pointer;
  }
</style>

