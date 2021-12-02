<template>
  <div id='shop'>
        <NavTop>
              <template #rightcon>  
                 <van-icon name="search" size="18" color="#333"/>
              </template>  
        </NavTop>    
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for='item in slidelist' :key='item.id'>
                  <van-image :src="item.img" class='slideimg_style'/>
              </van-swipe-item>
        </van-swipe>
        <ShopIntro :title='shopinfo.name' :subtitle='shopinfo.intro' :desc='shopinfo.desc' :logo='shopinfo.logo'>
            <Badge :title='item.name' v-for='item in couponlist' :key='item.id' />
        </ShopIntro>  
        <div class='shop_content'>
            <van-tabs v-model="activeMenu"> 
                <van-tab title="点餐">
                    <ShopShow :bg='shopinfo.hotbg' title='商家推荐'>
                         <ShopShowItem v-for='item in hotlist' :key="item.id" :img='item.headimg' :title='item.name' :price='item.price' :url="'/goodsdetail/'+item.id" :itemdata='item'/>
                    </ShopShow>
                    <div class='shop_goods_container'>
                         <div class='shop_goods_nav'>
                            <van-sidebar v-model="activeClass" @change="chooseClass">
                                <van-sidebar-item v-for="item in classlist" :key='item.id' :title="item.name"/>
                           </van-sidebar>
                         </div>
                         <div class='shop_goods_list'>
                              <GoodsClass :title='classname' :subtitle='classdesc' >
                                   <GoodsItem v-for='item in goodslist' :key='item.id' :title='item.name' :subtitle='item.desc' :price='item.price' :img='item.headimg' :url="'/goodsdetail/'+item.id" :itemdata='item'/>
                              </GoodsClass>
                         </div>    
                    </div>    
                </van-tab>
                <van-tab title="评价"><van-empty image="error" description="暂无评价内容" /></van-tab>

                <van-tab title="商家信息">
                    <div class='shop_info'>
                          <div class='shop_info_item'>
                              <div class='shop_info_title'>
                                {{shopinfo.name}}
                              </div> 
                              <div class='shop_info_desc'>
                                 <van-icon name='location-o' size='18' /> {{shopinfo.address}}
                              </div> 
                          </div>  
                           <div class='shop_info_item'>
                              <div class='shop_info_title'>
                                  商家信息
                              </div> 
                              <div class='shop_info_desc'>
                                  商家品类:{{shopinfo.business}}
                              </div> 
                              <div class='shop_info_desc'>
                                  营业时间:{{shopinfo.opentime}}
                              </div> 
                          </div> 
                    </div>  
                </van-tab>
            </van-tabs>
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
import { NavBar,Icon , Swipe, SwipeItem,Tab, Tabs ,Sidebar, SidebarItem ,Empty,Dialog,Image as VanImage} from 'vant';
import ShopShow from '@/components/shopshow';
import ShopShowItem from '@/components/shopshow/shopshowitem';
import ShopIntro from '@/components/shopintro';
import Badge from '@/components/badge';
import GoodsClass from '@/components/goodsclass'
import GoodsItem from '@/components/goodsclass/goodsitem'
import ShopCart from '@/components/shopcart'
import NavTop from '@/components/navtop'

export default {
   name: 'index',
   data() {
      return {
        keywords:'',
        activeMenu:'',
        activeClass:0,
        goodslist:[],
        slidelist:[],
        hotlist:[],
        couponlist:[],
        classlist:[],
        classgoods:[],
        shopinfo:{},
        classinfo:[],
        classname:'',
        classdesc:'' 
      }
   }, 
   computed:{
       cartlist(){
           return this.$store.state.shop.cartlist
       },
       storename(){
          return this.$store.getters.fromshop
       }
   },
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
          this.$post('/shop/getShopInfo',{id:this.$route.params.id}).then((data)=>{
              if(!data.result.success){
                  this.$toast(data.result.info)
                  return false;
              }
              this.goodslist=data.result.info.classgoods[0]
              this.slidelist=data.result.info.slidelist
              this.hotlist=data.result.info.hotlist
              this.shopinfo=data.result.info.shopinfo
              this.couponlist=data.result.info.couponlist
              this.classlist=data.result.info.classlist
              this.classgoods=data.result.info.classgoods
              this.classinfo=data.result.info.classinfo
              
              this.$store.commit("SET_SHOP",{shopname:data.result.info.shopinfo.name,shopid:data.result.info.shopinfo.id})
            
          })
      },
      chooseClass(tabid) {
          this.goodslist=this.classgoods[tabid]
          this.classname=this.classinfo[tabid].classname
          this.classdesc=this.classinfo[tabid].classdesc
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
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Sidebar.name]: Sidebar,
        [SidebarItem.name]: SidebarItem,
        [Empty.name]: Empty,
        [Dialog.Component.name]: Dialog.Component,
        [VanImage.name]:VanImage,
        ShopShow,
        ShopShowItem,
        ShopIntro,
        Badge,
        GoodsClass,
        GoodsItem,
        ShopCart,
        NavTop
   }
}
</script>
<style scoped>
#shop{background-color:#F6F6F6;min-height: 100vh;}
::v-deep .van-search{position:fixed;width:100%;top:0;left:0;}
::v-deep .van-field__right-icon{display:flex;}
::v-deep .van-nav-bar{background-color: transparent;}
::v-deep [class*=van-hairline]::after{border: none;}
.my-swipe .van-swipe-item {color: #fff;line-height: 3.5rem;text-align: center;background-color: #39a9ed;}
.my-swipe .van-swipe-item img{max-height: 3.5rem;}
.shop_content{margin-top: 2rem;}
.shop_goodslist{margin-left: 80px;}
.shop_goods_container{display: flex;padding-bottom: 85px;}
.shop_goods_nav{flex:1;background-color: #ffffff;}
.shop_goods_list{flex:4;background-color: #ffffff;}
.shop_info{background-color:#ffffff;padding: 0.2rem;border-bottom-left-radius:0.2rem;border-bottom-right-radius:0.2rem;margin-left:0.2rem;margin-right: 0.2rem;text-align: left;}
.shop_info_item{padding: 0.2rem;}
.shop_info_title{font-size: 0.4rem;font-weight: 600;}
.shop_info_desc{display:flex;font-size:0.3rem;color:#bbb;align-items: center;padding: 0.1rem;}
.goodsclass-from{padding-left:0.2rem;font-size:0.3rem;color:#cccccc;}
.goodsclass-clear{float:right;}
.slideimg_style{max-height: 3.7rem;}
</style>