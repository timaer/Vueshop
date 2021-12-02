<template>
  <div id='payment'>
       <NavTop title='选择支付方式' :islink='true' linkurl='/index'/>
       <van-radio-group v-model="radio">
        <van-cell-group>
            <van-cell clickable @click="radio = '1'" title-class="title" value-class="value">
                    <template #title>
                        <Icon src='alipay' class='payicon'/>
                        <span class='paywords'>支付宝</span>
                    </template>    
                    <template #right-icon>
                        <van-radio name="1" checked-color="#07C160"/>
                    </template>
            </van-cell>
            <van-cell title="微信" clickable @click="radio = '2'" title-class="title" value-class="value">
                    <template #title>
                        <Icon src='wechat'  class='payicon'/>
                        <span class='paywords'>微信支付</span>
                    </template> 
                    <template #right-icon>
                        <van-radio name="2" checked-color="#07C160"/>
                    </template>
            </van-cell>
        </van-cell-group>
       </van-radio-group>
       <van-submit-bar :price="realmoney*100" button-text="去付款" @submit="onSubmit" />
  </div>
</template>
<script>
import {RadioGroup, Radio ,Cell, CellGroup,SubmitBar } from 'vant'
import NavTop from '@/components/navtop'
import Icon from '@/components/icon'

export default {
   name: 'index',
   data() {
        return {
          radio:'1',
          realmoney:0,
          processing:false
        };
   }, 
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
          this.$post('/order/getOrderInfo',{orderid:this.$route.params.orderid}).then((data)=>{
              if(data.result.success){
                   this.realmoney=Number(data.result.info.realmoney)
              }
          })
      },
      onSubmit(){
          if(this.processing){
              this.$toast('请等待交易完成');
              return false
          }
          this.processing=true
          this.$post('/order/goPay',{orderid:this.$route.params.orderid,type:this.radio}).then((data)=>{
              if(data.result.success){
                  this.$router.push('/paymentresult/'+data.result.info)
              }else{
                  this.$toast(data.result.info)
              }
              this.processing=false
          })
      }
   },
   components: {
        [RadioGroup.name]:RadioGroup,
        [Radio.name]:Radio,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [SubmitBar.name]:SubmitBar,
        Icon,
        NavTop
   }
}
</script>
<style scoped>
#payment{background-color:#F6F6F6;min-height: 100vh;padding-top:60px;z-index:999;}
.title{display: flex;align-items: center;}
.value{display: flex;align-items: center;}
.payicon{width:0.6rem;height:0.6rem;}
.paywords{padding: 0.1rem;}
</style>