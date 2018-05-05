<template>
  <div class="login-box" v-bind:class="{'md-show':mdShow}" @click="closeModal">
    <div class="child-box">
      <div class="input-box">
        <div class="error-wrap2">
          <!--<span class="error" v-show="errorTip">用户名或者密码错误</span>-->
          <slot name="message"></slot>
        </div>

      </div>
      <div class="btns">
        <!--<a href="javascript:;" class="btn-login" @click="login">登  录</a>-->
        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<script>
        export default {
          props:["mdShow"],
          data () {
                return {

                }
          },
          methods: {
            closeModal () {
              this.$emit('close');
            }
          }
        }
</script>

<style scoped>

       .btns a {
         display: inline-block;
         width: 100px;
         height: 40px;
         background-color: #ff5482;
         border-radius: 3px;
         margin:60px 20px;
         color: #fff;
         line-height: 40px;
         cursor: pointer;
       }
       .error-wrap2 {
         display: block;
          padding-top:30px;
       }
       .error-wrap2 p {
          line-height: 60px;
       }
       .md-show {
         display: none;
       }
</style>
