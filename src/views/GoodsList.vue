<template>
<div>
    <nav-header></nav-header>
    <nav-swiper></nav-swiper>
    <div class="m-filter m-sort">
        <ul>
            <li  v-bind:class="{'z-current':checkIndex==index}" @click="checkIndex=index" ><a @click="sortFilter(0)" href="javascript:;">推荐</a></li>
            <li v-bind:class="{'z-current':checkIndex==index1}" @click="checkIndex=index1" ><a @click="sortFilter(1)"    href="javascript:;">折扣</a></li>
            <li v-bind:class="{'z-current':checkIndex==index2}" @click="checkIndex=index2" ><a @click="sortUp()" href="javascript:;">价格<i class="fa fa-long-arrow-down" v-bind:class="{'sort-up':sortFlag}" aria-hidden="true"></i> </a></li>
        </ul>
        <div class="f-clear-both"></div>
    </div>
    <div class="goods clearfix">
        <ul class="clearfix">
            <li class="item" v-for="item in goodsList">
                <div class="bdclo" @click="goDetail(item.productId)">
                <img v-bind:src="'static/'+item.productImage" alt="">
                <p class="p-name">{{item.productName}}</p>
                <p class="p-price">￥{{item.salePrice}}</p>
                </div>
            </li>
        </ul>
      <div class="load" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
        <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
      </div>
    </div>
    <nav-footer></nav-footer>
</div>
</template>

<script>
    import NavHeader from './../components/Header'
    import NavSwiper from './../components/NavSwiper'
    import NavFooter from './../components/Footer'
    import axios from 'axios'
     export default {
         data() {
             return {
                 goodsList: [],
                 sortFlag:true,
                 page:1,
                 pageSize:8,
                 busy:true,
                 kindChecked:"All",
                 loading:false,
                 checkIndex:'0',
                 index:'0',
                 index1:'1',
                 index2:'2'

             }
         },
         mounted () {
           this.getGoodsList();
         },
         components: {
             NavHeader,
             NavSwiper,
             NavFooter
         },
       methods: {
           getGoodsList(flag) {
             var param = {
               page:this.page,
               pageSize:this.pageSize,
               sort:this.sortFlag? 1 : -1,
               kindChecked:this.kindChecked
             }
             this.loading = true;
             axios.get("/goods",{
               params:param
             }).then((response) =>{
               this.loading = false;
               let res = response.data;
             console.log(res);
             if(res.status === "0") {
//              根据参数看是否分页
               if(flag) {
                 this.goodsList = this.goodsList.concat(res.result.list);
                 if (res.result <= 8) {
                   this.busy = true;
                 } else {
                   this.busy = false;
                 }
               }else {
                 this.goodsList = res.result.list;
                 this.busy = false;
               }
             }else {
               this.goodsList = [];
             }
           })
           },
           sortUp () {
             this.sortFlag = !this.sortFlag;
             this.page = 1;
             this.kindChecked = "All";
             this.getGoodsList();
           },
           sortFilter (item) {
              this.kindChecked = item;
              this.page = 1;
              this.getGoodsList();
           },
           loadMore () {
             this.busy = false;
             setTimeout(() => {
               this.page++;
               this.getGoodsList(true);
           }, 500);
           },
           goDetail (id) {
               this.$router.push({path:'/detail/'+id})
           }
       }
     }
</script>

<style>
    .m-sort {
        background-color: #f8f9fa;
        height: 48px;
        line-height: 48px;
        padding: 0;
        font-size: 14px;
    }
    .m-filter {
        color: #4a4a4a;
    }
    .m-sort ul {
        margin: 0;
    }
    .m-filter ul {
        margin-left: 40px;
        list-style-type: none;
    }
   ul {
        margin: 1em 0;
    }
    .m-sort li, .m-sort ul {
        margin: 0;
    }
    .m-filter li {
        float: left;
        display: inline;
        margin: 0 0 0 10px;
    }
    .m-sort .z-current a {
        color: #ff4965;
        background: #fff;
    }
    .m-sort a {
        display: inline-block;
        width: 80px;
        height: 48px;
        text-align: center;
        _zoom: 1;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
    }
    a {
        color: #3e3e3e;
        text-decoration: none;
    }
    .goods{
        margin:0 30px;
    }
    .goods ul{
        width:100%;;
    }
    .goods ul li {
        float: left;
        width:25%;
        text-align: center;
        margin-bottom:30px;
        cursor: pointer;
    }
    .goods ul li img{
        width:100%;
    }
    .bdclo{
        border: 1px solid #eee;
        display: inline-block;
        width: 80%;
        text-align: center;
    }
    .bdclo:hover {
        border: 1px solid #ff5482;
    }
    .p-name {
        width: 80%;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size:12px;
        color:#666666;
        line-height:40px;
    }
    .p-price {
        color: #ff5482;
        line-height:30px;
    }
    .load {
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
  .fa-long-arrow-down {
    margin-left: 5px;
  }
  .sort-up {
    transform: rotate(180deg);
  }
</style>
