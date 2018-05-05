<template>
  <div>
    <nav-header></nav-header>
    <div class="cart-wrap w">
      <div class="cart-header">
        <table class="cart-table">
          <tbody>
          <tr>
            <th class="cart-cell cell-check">
              <!--<label>  <input type="checkbox" class="cart-select-all" checked="checked">-->
              <!--<span>全选</span>-->
              <!--</label>-->
            </th>
            <th class="cart-cell cell-info">商品信息</th>
            <th class="cart-cell cell-price">单价</th>
            <th class="cart-cell cell-count">数量</th>
            <th class="cart-cell cell-total">合计</th>
            <th class="cart-cell cell-opera">操作</th>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="cart-list">
        <table class="cart-table" data-product-id="39" data-checked="1">
          <tbody>
          <tr v-for="item in cartList">
            <td class="cart-cell cell-check">
              <input type="checkbox" class="cart-select" :checked="item.checked === '1'" @click="edit('checked',item)">
            </td>
            <td class="cart-cell cell-img">
              <a>
                <img class="p-img" v-bind:src="'static/'+item.productImage">
              </a>
            </td>
            <td class="cart-cell cell-info">
              <a class="link p-name">{{item.productName}}</a>
            </td>
            <td class="cart-cell cell-price">￥{{item.salePrice}}</td>
            <td class="cart-cell cell-count">
              <span class="count-btn" @click="edit('min',item)">-</span>
              <span class="count-input">{{item.productNum}}</span>
              <span class="count-btn" @click="edit('add',item)">+</span>
            </td>
            <td class="cart-cell cell-total">{{item.productNum*item.salePrice}}</td>
            <td class="cart-cell cell-opera">
              <a class="link cart-delete" @click="delCartConfirm(item.productId)">删除</a>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="cart-footer clearfix">
          <div class="select-con">
            <label @click="toggle">
              <input type="checkbox" class="cart-select-all" :checked="checkAllFlag == '1'">
              <span>全选</span>
            </label>
          </div>
          <div class="delete-con">
            <a class="cart-delete-seleced link">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              <span>删除选中</span>
            </a>
          </div>
          <div class="submit-con">
            <span>总价：</span> <span class="submit-total">{{total|currency('$')}}</span>
            <span class="btn submit-btn" @click="checkOut" v-bind:class="{'btn--dis':checkedCount==0}" >去结算</span>
          </div>
        </div>
      </div>
    </div>
    <modal :mdShow="modalpop" v-on:close="closeModel">
      <p slot="message">你确认要删除这条数据吗？</p>
      <div slot="btn">
        <a class="btn-n" @click="delCart">确认</a>
        <a class="btn-n" @click="modalpop=true">关闭</a>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/cart.css'
  import NavHeader from './../components/Header'
  import NavFooter from './../components/Footer'
  import Modal     from './../components/Model'
  import {currency} from './../util/currency'
  import axios from 'axios'

  export default {
    data () {
      return {
        cartList: [],
        modalpop: true,
        productId: '',
//                 checkAllFlag:"1"
      }
    },
    mounted () {
      this.getCart();
    },
//    局部过滤器
    filters:{
      currency:currency
    },
    computed: {
      total () {
          var money = 0;
          this.cartList.forEach((item) => {
            if(item.checked=='1'){
          money += parseFloat(item.salePrice)*parseInt(item.productNum);
        }
          })
        return money;
      },
      checkAllFlag(){
        return this.checkedCount == this.cartList.length ? "1" : "0";
      },
      checkedCount(){
        var i = 0;
        this.cartList.forEach((item) => {
          if(item.checked == '1'
      )
        i++;
      })
        return i;
      }
    },
    methods: {
      getCart () {
        axios.get('/users/cartList').then((response) => {
          let res = response.data;
        if (res.status == '0') {
          this.cartList = res.result;
        }
      })
      },
      delCartConfirm (productId) {
        this.productId = productId;
        this.modalpop = false;
      },
      delCart () {
        axios.post("/users/cartDel", {
          productId: this.productId
        }).then((response) => {
          let res = response.data;
        if (res.status == "0") {
          this.modalpop = true;
          this.getCart();
        }
      })
      },
      closeModel (){
        this.modalpop = true;
      },
      edit(flag, item) {
        if (flag == 'add') {
          item.productNum++;
        } else if (flag == 'min') {
          if (item.productNum <= 1) {
            return;
          }
          item.productNum--;
        } else {
          item.checked = item.checked == "1" ? "0" : "1"
        }
        axios.post("/users/cartEdit", {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        }).then((response) => {
          let res = response.data;
//             if(res.status=="0"){
//               this.$store.commit("updateCartCount",flag=="add"?1:-1);
//             }
      })
      },
      toggle () {
        var flag = this.checkAllFlag == "1" ? "0" : "1"
//               this.checkAllFlag = this.checkAllFlag == "1"? "0" : "1"
        this.cartList.forEach((item) => {
          item.checked = flag
      })
        axios.post('/users/editCheckAll', {
          checkAll: flag
        }).then((respones) => {
          let res = respones.data;
        if (res.status == "0") {
          console.log("success");
        }
      })
      },
      checkOut () {
        if(this.checkedCount>0){
          this.$router.push({
            path:"/address"
          });
        }
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
  .submit-btn {
    display: inline-block;
    width: 100px;
    height: 40px;
    background-color: red;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }

  .link, input {
    cursor: pointer;
  }

  .cart-wrap {
    min-height: 480px;
  }

  .count-input {
    display: inline-block;
  }
  .btn--dis {
    background-color: #dbdbdb!important;
  }
</style>
