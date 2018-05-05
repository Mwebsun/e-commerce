<template>
  <div>
    <nav-header></nav-header>
   <div class="confirm-wrap w">
    <div class="next">
      <router-link v-bind:to="{path:'orderConfirm',query:{'addressId':selectedId}}">Next</router-link>
    </div>
    <div class="panel">
      <h2 class="panel-title">收货地址</h2>
      <div class="panel-body address-list">
        <a  v-for="(item,index) in addressList"   v-bind:class="{'checked':checkIndex == index}"  @click="checkIndex = index;selectedId=item.addressId"    class="address-item">
          <div class="address-title">
            <span class="city">{{item.streetName}}</span>
            <span class="name">（{{item.userName}} 收 ）</span>
          </div>
          <div class="address-detail"> {{item.tel}}</div>
          <div v-if="item.isDefault">默认地址</div>
          <div class="address-opera" v-else>
            <span class="link address-update" @click="setDefault(item.addressId)">设置默认</span>
            <!--<span class="link address-delete">删除</span>-->
          </div>
        </a>
        <div class="address-item add">
          <div class="address-new">
            <i class="fa fa-plus"></i>
            <div class="text">使用新地址</div>
          </div>
        </div>
      </div>
    </div>
   </div>



    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/address.css'
  import NavHeader from './../components/Header'
  import NavFooter from './../components/Footer'
  import Modal     from './../components/Model'
  import axios from 'axios'
  export default {
         data () {
           return {
             addressList:[],
             checkIndex:0,
             selectedId:''
           }
         },
         mounted () {
           this.init();
        },
        components: {
          NavHeader,
          NavFooter,
          Modal
        },
        methods: {
          init() {
            axios.get("/users/addressList").then((response)=>{
              let res = response.data;
              this.addressList = res.result;
              this.selectedId = this.addressList[0].addressId;
          });
          },
          setDefault (addressId) {
            axios.post("/users/setDefault",{
              addressId:addressId
            }).then((response)=>{
              let res = response.data;
            if(res.status=='0'){
              console.log("set default");
              this.init();
            }
          })
          }
        }
  }
</script>

<style scoped>
  .confirm-wrap {
    position: relative;
  }
  .next a {
    display: inline-block;
    color:#fff;
    width:100px;
    height: 40px;
    background-color: red;
    position: absolute;
    right: 0;
    top:300px;
    line-height: 40px;
    text-align: center;
  }
  .checked {
    background-color: #eee;
  }
</style>
