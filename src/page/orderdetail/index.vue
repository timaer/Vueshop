<template>
  <div id='orderdetail'>
        <NavTop title='订单详情'/>
        <van-cell-group inset>
                    <van-cell title-class="address_title" value-class="address_label">
                        <template #title>
                            <van-icon name="location-o" /><span class='address_con'>{{orderinfo.province}}{{orderinfo.city}}{{orderinfo.county}}{{orderinfo.address}}</span>
                        </template>
                        <template #label>
                            {{orderinfo.name}} {{orderinfo.mobile}}
                        </template>        
                    </van-cell>
        </van-cell-group>  
        <van-cell-group inset>
           <van-cell>
               <template #title>
                  <div class='title'>订单号:{{orderinfo.ordernum}}</div>
                  <div class='goodsitem'>
                        <div class='cellitem' v-for='item in orderinfo.ordergoods' :key='item.id'>
                              <div class='goodsimg'><img :src='item.headimg'/></div>
                              <div class='info'>
                                 <div class='line'><div class='goodstitle'>{{item.name}}</div><div class='price'>¥{{item.price}}</div></div>
                                 <div class='line'><div class='subprice'>x{{item.nums}}</div><div class='dashprice'>¥{{item.dashprice}}</div></div>
                              </div>
                        </div>
                        <div class='cellitem'>
                           <div class='celltitle'>优惠说明</div>
                           <div class='cellright'>总价:{{orderinfo.totalmoney}}  优惠:-{{orderinfo.discountmoney}} </div>
                        </div>
                  </div>   
               </template>   
           </van-cell> 
        </van-cell-group> 
        <van-cell-group inset>
            <van-cell title-class="address_title_short" value-class="address_value_long" >
                <template #title>备注</template>
                <template #default>{{orderinfo.memo}}</template>
            </van-cell>  
            <van-cell title-class="address_title_short" value-class="address_value_long" >
                <template #title>餐具份数</template>
                <template #default>{{orderinfo.dinnerware}}</template>
            </van-cell>   
         </van-cell-group>
         <van-submit-bar :price="orderinfo.totalmoney*100" button-text="去支付" @submit="onSubmit" v-if='orderinfo.status==1'/>
  </div>
</template>
<script>
import { Cell, CellGroup,Icon ,Form ,Field,Button,SubmitBar} from 'vant';
import NavTop from '@/components/navtop'

export default {
   name: 'orderdetail',
   data() {
      return {
         orderinfo:{}
      }
   }, 
   created(){
      this.getList()
   },
   methods: {
      getList(){ 
           this.$post("/order/getOrderDetail",{orderid:this.$route.params.id}).then((data)=>{
               if(data.result.success){
                  this.orderinfo=data.result.info
               }else{
                  this.$toast(data.result.info)
               }
           })
      },
      onSubmit(){
          this.$router.push('/payment/'+this.orderinfo.id)
      }
   },
   components: {
        [Cell.name]: Cell ,
        [CellGroup.name]: CellGroup ,
        [Icon.name]: Icon ,
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button,
        [SubmitBar.name]:SubmitBar,
        NavTop
   }
}
</script>
<style scoped>
#orderdetail{background-color:#F6F6F6;min-height: 100vh;padding-top:60px;padding-bottom: 85px;}
.address_title{flex:4;text-align: left;}
.address_value{flex:1;}
.address_title_short{flex:2;text-align: left;}
.address_value_long{flex:4;}
.address_empty{display: flex;align-items: center;}
.address_add{padding-left:0.2rem;}
.address_con{margin-left:0.1rem;}
.title{color:#cccccc;text-align: left;}
.goodsitem{display: flex;flex-direction: column;}
.goodsimg{width:2rem;height:2rem;}
.goodsimg img{width:100%;}
.info{flex:4;padding-left:0.2rem;}
.cellitem{display: flex;flex-direction: row;margin-top: 0.15rem;}
.line{display: flex;flex-direction: row;}
.price{margin-left:auto;font-size:0.35rem;}
.dashprice{margin-left:auto;color:#cccccc;text-decoration: line-through;font-size:0.3rem;}
.cellright{margin-left:auto;color:#969799}
.subprice{color:#bbbbbb;font-size:0.3rem;}
.goodstitle{font-size:0.35rem;font-weight: 600;}
::v-deep .van-cell-group--inset{margin-top: 0.3rem;}
</style>