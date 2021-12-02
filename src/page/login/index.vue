<template>
  <div id='login'>
      <div class='logo'>
          <Icon src='login' class='logoimg'/>
      </div>
      <div class='title'>VueShop商城</div>
      <div class='subtitle'>用户名:vshop 密码:vshop</div>
      <div class='loginform'>
          <div class='login-input'>
             <div class='login-input-icon'><Icon src='user' class='login-input-svg'/></div><div class='login-input-content'> <input type='text' v-model='username' /></div>
          </div>
          <div class='login-input'>
             <div class='login-input-icon'><Icon src='password' class='login-input-svg'/></div><div class='login-input-content'> <input type='password' v-model='password' /></div>
          </div>
          <div class='login-btn'>
              <van-button color="#FF8A7A" block @click='doLogin()'>登  陆</van-button>
          </div> 
          <div class='forget_password'>
              忘记密码?
          </div>    
      </div>    
      <div class='bottomwords'>copyright@2021</div>
  </div>
</template>
<script>
import {Button} from 'vant'
import Icon from '@/components/icon'

export default {
   name: 'login',
   data() {
        return {
          username:'vshop',
          password:'vshop'
        };
   }, 
   methods: {
      doLogin(){
          if(this.username=='') {
              this.$toast("用户名不能为空")
              return false
          }
          if(this.password=='') {
              this.$toast("密码不能为空")
              return false
          }

          this.$store.dispatch("doLogin",{username:this.username,password:this.password}).then((data)=>{
              if(!data.result.success){
                  this.$toast(data.result.info);return false;
              }
              this.$router.push('/index')
          })
      }
   },
   components: {
        [Button.name]:Button,
        Icon
   }
}
</script>
<style scoped>
#login{background-color:#F6F6F6;min-height: 100vh;padding-top:60px;z-index:999;padding: 0 0.5rem;overflow:hidden;position: relative;}
.logo{margin-top:1.5rem;}
.logoimg{width:4rem;height:4rem;}
.title{font-size:0.5rem;font-weight: 600;padding: 0.15rem;}
.subtitle{font-size:0.3rem;padding: 0 0.1rem 0.1rem;}
.login-btn{margin-top: 0.5rem;}
.login-input{background-color: #eeeeee;height:1.2rem;margin-top: 0.2rem;border-radius: 0.2rem;display:flex;align-items: center;}
.login-input-icon{width:1.5rem;text-align: center;}
.login-input-svg{width:0.5rem;height:0.5rem;}
.login-input-content{flex:3;}
.login-input-content input{outline: none;border: none;background-color: #eeeeee;height:1rem;line-height: 1rem;width:100%;font-size:0.4rem;border-radius: 0.2rem;}
.forget_password{margin-top: 0.4rem;color:#7AB5FB;font-size:0.3rem;letter-spacing: 1px;}
.bottomwords{position: absolute;width: 100%;text-align: center;left:0;bottom:0;font-size:0.25rem;}
</style>