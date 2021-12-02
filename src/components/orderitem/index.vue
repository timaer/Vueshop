<template>
        <div class='orderitem-container'>
          <router-link :to="'/shop/'+shopinfo.id">
            <div class='orderitem-shopinfo'>
              
                  <div class='orderitem-shopinfo-logo'>
                      <img :src='shopinfo.logo' />
                  </div>  
                  <div class='orderitem-shopinfo-name'>
                      {{shopinfo.name}}
                  </div>
                  <div class='orderitem-shopinfo-arrow'>
                      <van-icon name="arrow" />
                  </div>
            </div>  
          </router-link> 
            <router-link :to="'/orderdetail/'+orderinfo.id"> 
             <div class='orderitem-content'>  
                  <div class='orderitem-show' v-if='orderinfo.goodsnums==1'>
                          <div class='orderitem-show-icon'>
                              <img :src='ordergoods[0].headimg' />
                          </div>
                          <div class='orderitem-show-desc'>
                              <div class='orderitem-show-title'>{{ordergoods[0].name}}</div>
                          </div>
                  </div>
                  <div class='orderitem-show' v-else>
                          <div class='orderitem-slide' v-for='item in ordergoods' :key='item.id'>
                               <img :src='item.headimg' />
                          </div>
                  </div>          
                  <div class='orderitem-sum'>
                      <div class='orderitem-sum-totalmoney'>
                          ¥{{orderinfo.totalmoney}} 
                      </div>
                      <div class='orderitem-sum-nums'>
                            共{{orderinfo.totalnums}}件
                      </div>     
                  </div> 
             </div> 
          </router-link> 
            <div class='orderitem-btn-container'>
               <div class='orderitem-btn-left'>
                    <span class='orderitem-btn-leftstatus' v-if='orderinfo.status==1'>
                       待支付
                    </span>
                    <span class='orderitem-btn-leftstatus' v-if='orderinfo.status==2'>
                       已完成
                    </span>
                    <span class='orderitem-btn-leftstatus' v-if='orderinfo.status==3'>
                       售后中
                    </span>
               </div>   
               <div class='orderitem-btn-right'>
                  <div class='orderitem-btn orderitem-btn-look' @click="goUrl('/orderdetail/'+orderinfo.id)">
                     查看详情
                  </div>
                  <div class='orderitem-btn orderitem-btn-pay' v-if='orderinfo.status==1' @click="goUrl('/payment/'+orderinfo.id)">
                     去支付
                  </div>
               </div>      
            </div>   
        </div>
     
</template>
<script>
import { Icon } from 'vant';
export default {
  name: 'OrderItem',
  props: {
     shopinfo:Object,
     ordergoods:Array,
     orderinfo:Object
  },
  components:{
    [Icon.name]:Icon 
  },
  methods:{
    goUrl(url){
         this.$router.push(url)
    }
  }
}
</script>
<style scoped>
.orderitem-container{padding: 0.3rem;display: flex;background-color:#ffffff;border-radius:0.2rem;margin-top:0.2rem;flex-direction: column;}
a{color:#333333;}
.orderitem-shopinfo{display: flex;align-items: center;}
.orderitem-shopinfo-logo img{width:0.8rem;border-radius: 0.1rem;}
.orderitem-shopinfo-name{padding-left:0.2rem;font-size: 0.3rem;}
.orderitem-shopinfo-arrow{margin-left:auto;}
.orderitem-content{display: flex;}
.orderitem-show{flex:4;display: flex;margin-top:0.2rem;align-items: center;overflow-x:scroll;overflow-y:hidden;height:1.8rem;}
.orderitem-show-icon{width:2rem}
.orderitem-show-icon img{width:100%;}
.orderitem-show-desc{}
.orderitem-show-title{font-size:0.35rem;color:#333333;text-align: left;padding: 0.10rem;padding-left:0.3rem;}
.orderitem-slide{padding: 0.1rem;}
.orderitem-slide img{width:2rem;}
.orderitem-sum{flex:1;display:flex;justify-content: center;flex-direction: column;}
.orderitem-sum-totalmoney{font-size:0.35rem;font-weight:600;padding: 0.1rem;}
.orderitem-sum-nums{color:#cccccc;}
.orderitem-btn-container{display: flex;padding-top:0.2rem;align-items: center;}
.orderitem-btn-leftstatus{color:#cccccc;}
.orderitem-btn{border-radius: 1rem;border-width: 1px; border-style: solid;background:#ffffff;font-size:0.35rem;padding: 0.1rem 0.3rem;}
.orderitem-btn-right{margin-left:auto;display: flex;}
.orderitem-btn-look{border-color:#56ABC5;color:#56ABC5;}
.orderitem-btn-pay{border-color:#f56c6c;color:#f56c6c;margin-left:0.2rem;}
::-webkit-scrollbar {display: none;}
</style>


