<template>        
          <div class='shopshowitem-container'>
            <router-link :to="url">
                <div class='shopshowitem-img'><img :src='img' class='shopshowImg'/></div>
                <div class='shopshowitem-title'>{{title}}</div>  
            </router-link>      
                <div class='shopshowitem-priceitem'>
                      <div class='shopshowitem-price'>¥{{price}}</div>
                      <div class='shopshowitem-btn'><Nums type='inline' :item='itemdata'/></div>
                </div>
          </div>
</template>
<script>
import Nums from '@/components/nums'
export default {
  name: 'ShopShowItem',
  props: {
    img:String,  
    title: String,
    price: String,
    url:String,
    itemdata:Object
  },
  components:{
      Nums
  }
}
</script>
<style scoped>
.shopshowitem-container{display: flex;flex-direction: column;flex:1 0 33%;background-color: #ffffff;border-radius: 0.2rem;padding-top: 0.35rem;margin-right: 0.1rem;}
.shopshowitem-container a{color:#333333;text-decoration: none;}
.shopshowImg{width:2.0rem;height:2.0rem;}
.shopshowitem-title{font-size:0.35rem;padding: 0.2rem;}
.shopshowitem-priceitem{display: flex;padding: 0.2rem;}
.shopshowitem-price{flex:2;color:#9F000D;font-size:0.4rem;}
.shopshowitem-btn{flex:1;}
</style>


