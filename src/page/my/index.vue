<template>
  <div id='my'>
        <MyPanel >
            <div class='baseinfo'> 
               <div class='baseinfo-icon'>
                    <van-image
                    round
                    width="2rem"
                    height="2rem"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    />
               </div>
               <div class='baseinfo-profile'>
                    <div class='baseinfo-title'>我是VueShop</div>
                    <div class='baseinfo-desc'>这是一个用Vue开发的小商城</div>
               </div> 
               <div class='baseinf-setting'>
                    <van-icon name="setting-o" size="0.5rem" @click='goSetting()'/>
               </div>     
           </div>
       </MyPanel>
       <MyPanel title='常用功能'>
            <PanelItem icon='order' title='订单' url='/orderlist' />
            <PanelItem icon='shopcart'  title='购物车' url='/shopcart'/>
            <PanelItem icon='coupon' title='优惠券' />
       </MyPanel>
       <MyPanel title='我的资产'>
            <PanelItem icon='money' title='余额' desc='¥200'/>
            <PanelItem icon='points' title='积分' desc='50000'/>
       </MyPanel>
       <MyPanel title='更多功能'>
            <PanelItem icon='address' title='我的地址' url='/addresslist/my'/>
            <PanelItem icon='service' title='我的客服' />
            <PanelItem icon='agreement' title='服务协议' url='/article/13'/>
            <PanelItem icon='privacy' title='隐私政策' url='/article/14'/>
       </MyPanel>
  </div>
</template>
<script>

import MyPanel from '@/components/mypanel'
import PanelItem from '@/components/mypanel/panelitem'
import { Image as VanImage ,Icon} from 'vant';


export default {
   name: 'index',
   data(){
      return {
       
      }
   }, 
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
        
      },
      goSetting(){
           this.$router.push("/setting")
      }
   },
   components: {
        MyPanel,
        PanelItem,
        [VanImage.name]:VanImage,
        [Icon.name]:Icon
   }
}
</script>
<style scoped>
#my{background-color:#F6F6F6;min-height: 100vh;padding: 0.3rem;}
.baseinfo{display:flex;width:100%;}
.baseinfo-icon{flex:2;}
.baseinfo-profile{flex:4;text-align: left;}
.baseinfo-title{font-size:0.5rem;}
.baseinfo-desc{font-size:0.15rem;padding: 0.1rem;}
</style>