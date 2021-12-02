<template>
      <router-link :to="url">
        <div class='shopitem-container'>
            <div class='shopitem-icon'>
                <img :src='headimg' />
            </div>
            <div class='shopitem-desc'>
                <div class='shopitem-title'>{{title}}</div>
                <div class='shopitem-subtitle'>{{subtitle}}</div>
            </div>  
        </div>
     </router-link>
</template>
<script>
import Icon from '@/components/icon'
export default {
  name: 'ShopItem',
  props: {
    headimg:String,
    title: String,
    subtitle:String,
    url:String
  },
  components:{
    [Icon.name]:Icon 
  }
}
</script>
<style scoped>
.shopitem-container{padding: 0.3rem;display: flex;background-color:#ffffff;border-radius:0.2rem;margin-top:0.2rem;}
.shopitem-icon{flex:2;}
.shopitem-icon img{width:100%;height:100%;}
.shopitem-desc{flex:4;display: flex;flex-direction: column;padding: 0 0.15rem 0.15rem;}
.shopitem-title{font-weight: 600;font-size:0.4rem;color:#111111;text-align: left;padding: 0 0.15rem 0.15rem;}
.shopitem-subtitle{font-size:0.2rem;color:#333333;text-align: left;padding: 0.10rem;}
</style>


