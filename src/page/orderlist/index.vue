<template>
  <div id='orderlist'>
        <van-tabs v-model="active" @click='getOrderList'>
            <template #nav-right>
                      <van-icon name="search" size="20"/>
            </template>   
            <van-tab title="全部"></van-tab>
            <van-tab title="待付款"></van-tab>
            <van-tab title="待评价"></van-tab>
            <van-tab title="待退款"></van-tab>
        </van-tabs>
        <div class='shopItemList'>
           <OrderItem 
             v-for="item in orderlist"
            :key="item.id"
            :shopinfo='item.shopinfo'
            :ordergoods='item.ordergoods'
            :orderinfo='item.orderinfo'
            />
        </div> 
  </div>
</template>
<script>
import { Search } from 'vant';
import { Tab, Tabs ,Icon  } from 'vant';
import OrderItem from '@/components/orderitem'

export default {
   name: 'orderlist',
   data() {
      return {
        orderlist:[], 
        active:0
      }
   }, 
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
         this.getOrderList(0)
      },
      getOrderList(status){
         this.$post("/order/getOrderList",{status:status}).then((data)=>{
            if(data.result.success){      
                this.orderlist=data.result.info 
            }else{
                this.$toast("网络正繁忙，请稍后再试")
            }
         })
      }
   },
   components: {
        [Search.name]: Search,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Icon.name]: Icon,
        OrderItem
   }
}
</script>
<style scoped>
#orderlist{background-color:#F6F6F6;min-height: 100vh;padding-bottom: 85px;}
.shopItemList{padding: 0.3rem;padding-bottom: 60px;margin-top:44px;}
::v-deep .van-tabs{position:fixed;width:100%;top:0;left:0;}
::v-deep .van-icon {display: flex;align-items: center;padding: 0.2rem;}
</style>