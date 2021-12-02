<template>
        <div class='goodsitem-container'>
          <router-link :to="url">  
               <div class='goodsitem-img'><img :src='img' class='goodsitemImg'/></div>
          </router-link>       
               <div class='goodsitem-content'>
                        <div class='goodsitem-title'>{{title}}</div>  
                        <div class='goodsitem-subtitle'>{{subtitle}}</div>  
                        <div class='goodsitem-priceitem'>
                                <div class='goodsitem-price'>¥{{price}}</div>
                                <div class='goodsitem-btn'><Nums :item='itemdata'/></div>
                        </div>
               </div>
        </div>
</template>
<script>
import Nums from '@/components/nums'
export default {
  name: 'GoodsItem',
  props: {
    img:String,  
    title: String,
    subtitle:String,
    price: String,
    url:{type:String,default:''},
    itemdata:Object
  },
  components:{
      Nums
  }
}
</script>
<style scoped>
.goodsitem-container{display: flex;flex-direction: row;flex:1 0 33%;background-color: #ffffff;border-radius: 0.2rem;padding-top: 0.35rem;margin-right: 0.1rem;}
.goodsitemImg{width:2.0rem;height:2.0rem;}
.goodsitem-img{flex:1;}
.goodsitem-content{flex:3;display: flex;flex-direction: column;}
.goodsitem-title{font-size:0.35rem;padding: 0.1rem 0.2rem;}
.goodsitem-subtitle{font-size:0.25rem;padding:0.1rem 0.2rem;color:#ccc;}
.goodsitem-priceitem{display: flex;padding: 0.1rem 0.2rem;}
.goodsitem-price{flex:2;color:#9F000D;font-size:0.4rem;}
.goodsitem-btn{flex:1;}
</style>


