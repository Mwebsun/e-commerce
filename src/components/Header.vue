<template>
    <header class="header">
        <div>
            <div class="h-lf">
                <a href="/">
                    <img class="logo" src="../assets/logo.png" alt="">
                </a>
            </div>
            <div class="h-lr">

                 <i v-if="meName">
                   <router-link to="/cart"><i class="fa fa-cart-plus" aria-hidden="true"></i></router-link>
                   <i class="fa fa-user"></i>
                   <span class="u-name" >{{meName}}</span>
                 </i>
                <a href="javascript:void(0)" @click="loginFlag=true" v-if="!meName">登陆</a>
                <a href="javascript:void(0)" @click="logout" v-else>退出</a>
            </div>
        </div>

        <div class="login-box" v-show="loginFlag" v-on:click.self="loginFlag=false">
          <div class="child-box">
          <div class="input-box">
            <div class="error-wrap">
              <span class="error" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul class="center-input">
              <li class="">
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="login_user" placeholder="User Name">
              </li>
              <li class="">
                <input type="password" tabindex="2"  name="password" v-model="userPwd" class="login_pass" placeholder="Password" @keyup.enter="login">
              </li>
            </ul>
          </div>
          <div class="login-btn">
            <a href="javascript:;" class="btn-login" @click="login">登  录</a>
          </div>
        </div>
        </div>
    </header>
</template>

<script>
  import './../assets/css/login.css'
  import axios from 'axios'
    export default{
        data () {
           return {
             userName:'',
             userPwd:'',
             errorTip:false,
             loginFlag:false,
             meName:''
           }
        },
      mounted () {
            this.checkLogin();
      },
      methods: {
        checkLogin () {
            axios.get ("/users/checkLogin").then((response) => {
              let res = response.data;
              if(res.status == "0") {
                this.meName = res.result
              }
            })
        },
        login () {
          if(!this.userName || !this.userPwd){
            this.errorTip = true;
            return;
          }
          axios.post("/users/login",{
               userName:this.userName,
               userPwd: this.userPwd
             }).then((respones) => {
               let res = respones.data;
                if(res.status == "0") {
                  this.errorTip = false;
                  this.loginFlag = false;
                  this.meName = res.result.userName
                }else {
                  this.errorTip = true;
                }
         })
        },
        logout() {
            axios.post('/users/logout').then ((respones) => {
              let res = respones.data;
                if (res.status == '0') {
                  this.meName = ""
                }
            })
        }
      }
    }
</script>

<style>
    .header {
        width: 100%;
        height:1rem;
        line-height: 1rem;
        background: #f4f4f4;
        border-bottom: 1px #e8e8e8 solid;
    }
    .header .h-lf .logo {
        width:0.6rem;
        height: 0.6rem;
    }
    .h-lf {
        float:left;
        margin-left: 1rem;
    }
    .h-lr {
        float:right;
        margin-right:1rem;
    }
    .h-lr a {
        color: #25a4bb;
        letter-spacing:3px;
    }
    .u-name {
     margin:0 10px;
  }
  .fa-cart-plus {
    margin:0 10px 0 0;
    color:black;
    font-size: 18px;
  }
</style>
