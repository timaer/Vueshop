<template>
  <div id="app">
      <router-view />
      <van-tabbar v-if='isshowed' v-model="active" active-color='#FA614F' route>
          <van-tabbar-item replace to="/index" icon="wap-home">首页</van-tabbar-item>
          <van-tabbar-item replace to="/orderlist" icon="todo-list">订单</van-tabbar-item>
          <van-tabbar-item replace to="/my" icon="manager">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
   name: 'index',
   data() {
      return {
        active:''
      }
   }, 
   computed:{
       isshowed:function(){
           const TabbarList=['index','home','orderlist','my']
           if(TabbarList.includes(this.$route.name)){
               return true
           }else{
               return false
           }
       } 
   },
   components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem 
   }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
