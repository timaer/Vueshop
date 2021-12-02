<template>
  <div id='goodsdetail'>
         <NavTop></NavTop>   
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for='item in goodsslide' :key='item.id'>
                  <van-image :src="item.img"/>
              </van-swipe-item>
        </van-swipe>

        <div class='goodspanel'>
            <div class='title'>{{goodsinfo.name}}</div>
            <div class='subtitle'>{{goodsinfo.desc}}</div>
            <div class='priceline'>
                <div class='mainprice'>¥{{goodsinfo.price}}</div>
                <div class='dashprice'>¥{{goodsinfo.dashprice}}</div>   
                <div class='btncart'>
                    <van-button type="danger" size='mini' round @click='addToCart()'>+加入购物车</van-button>
                </div>         
            </div>
        </div>  

         <div class='goodspanel'>
            <div class='title'>商品详情</div>
            <div class='priceline'>
                 <div class='label'>
                     商品描述：
                 </div>
                 <div class='description'>
                     {{goodsinfo.desc}}
                 </div>        
            </div>
            <div class='priceline'>
                <div class='label'>
                    价格说明：
                 </div>
                 <div class='description'>
                     {{goodsinfo.desc}}
                 </div>    
            </div>
        </div>

        <div class='goodspanel'>
           <div class='title'>更多推荐</div>
           <div class='goodspromotion'>
                    <ShopShow>
                         <ShopShowItem v-for='item in moregoods' :key='item.id' :img='item.headimg' :title='item.name' :price='item.price' :url="'/goodsdetail/'+item.id" :itemdata='item'/>
                    </ShopShow>
           </div>
        </div>     
        <ShopCart tip='全场满99包邮' btntext='去结算'>
            <GoodsClass title='已选商品'>
                  <template v-slot:right>
                        <span class='goodsclass-from'>(来源店铺:{{storename}})</span>
                        <span class='goodsclass-clear'><van-icon name="delete-o" size="0.45rem" @click='clearCart'/></span>
                  </template>
                  <GoodsItem v-for='item in cartlist' :key='item.id' :title='item.title'  :price='item.price' :img='item.headimg' :itemdata='item'/>
            </GoodsClass> 
        </ShopCart> 

  </div>
</template>
<script>
import { NavBar,Icon , Swipe, SwipeItem,Button,Dialog,Image as VanImage} from 'vant';
import ShopCart from '@/components/shopcart';
import GoodsClass from '@/components/goodsclass';
import GoodsItem from '@/components/goodsclass/goodsitem';
import ShopShow from '@/components/shopshow';
import ShopShowItem from '@/components/shopshow/shopshowitem';
import NavTop from '@/components/navtop'

export default {
   name: 'index',
   data() {
      return {
           goodsslide:[],
           goodsinfo:{},
           moregoods:[]
      }
   }, 
   created(){
        this.getList(); 
   },
   watch:{
      "$route"(to,from){
          this.getList(); 
      }
   },
   computed:{
       storename(){
          return this.$store.getters.fromshop
       },
       cartlist(){
           return this.$store.state.shop.cartlist
       },
   },
   methods: {
      getList(){
           this.$post("/shop/getGoodsInfo",{id:this.$route.params.id}).then((data)=>{
               if(data.result.success){
                  this.goodsslide=data.result.info.goodsslide
                  this.goodsinfo=data.result.info.goodsinfo
                  this.moregoods=data.result.info.moregoods
               }else{
                  this.$toast(data.result.info)
               }
           })
      },
      addToCart(){
           this.$store.commit('ADD_TO_CART',{goodsItem:this.goodsinfo})
      },
      clearCart(){
             Dialog.confirm({
                title: '清空购物车',
                message: '您确定要清空当前购物车内容吗？',
                })
                .then(() => {
                   this.$store.commit('EMPTY_CART') 
                })
                .catch(() => {
                   Dialog.close	
                });
      }
   },
   components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Button.name]: Button,
        [Dialog.Component.name]: Dialog.Component,
        [VanImage.name]:VanImage,
        ShopCart,
        GoodsClass,
        GoodsItem,
        ShopShow,
        ShopShowItem,
        NavTop
   }
}
</script>
<style scoped>
#goodsdetail{background-color:#F6F6F6;min-height: 100vh;}
::v-deep .van-search{position:fixed;width:100%;top:0;left:0;}
::v-deep .van-field__right-icon{display:flex;}
::v-deep .van-nav-bar{background-color: transparent;}
::v-deep [class*=van-hairline]::after{border: none;}
.my-swipe .van-swipe-item {color: #fff;max-height: 6rem;text-align: center;}
.goodspanel{text-align: left;padding: 0.2rem;background-color: #ffffff;border-radius: 0.2rem;margin: 0.15rem;}
.title{text-align: left;font-size: 0.5rem;font-weight: 600;padding: 0.2rem;}
.subtitle{text-align: left;color:#bbbbbb;padding: 0 0.2rem;}
.priceline{display: flex;align-items: center;padding: 0.2rem;}
.label{flex:1;align-self: flex-start;color:#cccccc;}
.description{flex:4;}
.mainprice{font-size:0.6rem;color:#CB0930;}
.dashprice{font-size: 0.3rem;text-decoration: line-through;color:#cccccc;padding: 0.2rem;}
.btncart{margin-left:auto;}
.goodspromotion{display: flex;flex-wrap: wrap;padding-bottom: 85px;}
::v-deep .shopshowitem-container{flex:1 0 45%;}
::v-deep .shopshow-items{overflow: hidden;flex-wrap: wrap;}
::v-deep .shopshowImg{width:100%;height:100%;}
.goodsclass-from{padding-left:0.2rem;font-size:0.3rem;color:#cccccc;}
.goodsclass-clear{float:right;}
</style>