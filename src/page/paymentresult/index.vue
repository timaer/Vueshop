<template>
  <div id='paymentresult'>
       <NavTop title='支付结果' :islink='true' linkurl='/index'/>
       <van-empty
        class="custom-image"
        :image="showimg"
        :description="showdesc"
        />
  </div>
</template>
<script>
import { Empty } from 'vant';
import NavTop from '@/components/navtop'
import payok from '@/assets/img/payok.svg'
import payfail from '@/assets/img/payfail.svg'

export default {
   name: 'paymentresult',
   data() {
        return {
           paystatus:0,
           showimg:'',
           showdesc:''
        };
   }, 
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
         if(this.$route.params.paystatus==2){
             this.showimg=payok
             this.showdesc='支付成功'
         }else{
             this.showimg=payfail
             this.showdesc='支付失败'
         }
      }
   },
   components: {
        [Empty.name]:Empty,
        NavTop
   }
}
</script>
<style scoped>
#paymentresult{background-color:#F6F6F6;min-height: 100vh;padding-top:60px;z-index:999;}
 .custom-image .van-empty__image {
    width: 1.0rem;
    height: 1.0rem;
  }
::v-deep .van-empty__image{width:1rem;height:1rem;}  
</style>