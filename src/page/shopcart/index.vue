 <template>
     <div>
       <NavTop title='购物车'>
           <template #rightcon>
                 <span class='editbtn' @click='goEdit()'>编辑</span>
           </template>    
       </NavTop>    
       <div class="cart-content">
            <div class='goodsclass-container'>
                <span class='goodsclass-title' >购物列表 <span class='shop-from'>(店铺:{{shopname}})</span></span>
                <div class='goodsitem-container' v-for='item in carlist' :key='item.id'>
                    <van-checkbox :value="item.checked" checked-color="#ee0a24" @click='check_Goods(item.id)'></van-checkbox>
                    <router-link :to="'/goodsdetail/'+item.id">  
                        <div class='goodsitem-img'><img :src='item.headimg' class='goodsitemImg'/></div>
                    </router-link>       
                    <div class='goodsitem-content'>
                                <div class='goodsitem-title'>{{item.title}}</div>  
                                <div class='goodsitem-priceitem'>
                                        <div class='goodsitem-price'>¥{{item.price}}</div>
                                        <div class='goodsitem-btn'><Nums :item='item'/></div>
                                </div>
                    </div>    
                </div>
            </div>
            <van-submit-bar :price="carttotal*100" button-text="去结算" @submit="onSubmit" v-if='!editable'>
                <van-checkbox v-model="checkedAll" checked-color="#ee0a24" @click="checkAll()">全选</van-checkbox>
            </van-submit-bar>
           <van-submit-bar button-text="删除" @submit="onDeleteItem" v-else>
                <van-checkbox v-model="checkedAll" checked-color="#ee0a24" @click="checkAll()">全选</van-checkbox>
            </van-submit-bar>
       </div>
     </div>  
</template>
<script>
import {SubmitBar, Checkbox} from 'vant'
import NavTop from '@/components/navtop'
import Nums from '@/components/nums';
export default {
  data(){
      return{
          checkedAll:false,
          editable:false
      }
  },  
  computed:{
    carlist(){
        return this.$store.getters.realtimecartlist(this.$store.state.shop.checkstate)
    },
    shopname(){
        return this.$store.getters.fromshop
    },
    carttotal(){
        return this.$store.getters.checkedcarttotal(this.$store.state.shop.clicked,this.$store.state.shop.checkstate)
    }
  },
  methods:{
     onSubmit(){
          if(this.carttotal==0){
           this.$toast("请先选择要结算的商品")
           return false
         }
         this.$router.push("/cartorder")
     },
     goEdit(){
         this.editable=!this.editable
     },
     check_Goods(id){
        this.$store.commit("CHECK_GOODS",{id:id})
     },
     checkAll(){
       if(this.checkedAll==true){
             this.$store.commit("CHECK_ALLGOODS")
        }else{
             this.$store.commit("DISCHECK_ALLGOODS")
        }
     },
     onDeleteItem(){
        this.$store.commit("DELETE_CHECKED")
     }
  },
  components:{
    [Checkbox.name]:Checkbox,  
    [SubmitBar.name]:SubmitBar,  
    Nums,
    NavTop
  }
}
</script>
<style scoped>
.cart-content{ padding: 60px 10px 60px 10px;}
.editbtn{padding-right:0.2rem;}
.goodsclass-container{padding: 0.3rem;background-color:#ffffff;margin-top:0.2rem;text-align: left;}
.goodsclass-title{font-size: 0.4rem;font-weight: 600;text-align: left;padding: 0.25rem 0.25rem 0.25rem 0;}
.goodsclass-subtitle{font-size:0.25rem;text-align: left;color:#ccc;}
.goodsitem-container{display: flex;flex-direction: row;flex:1 0 33%;background-color: #ffffff;border-radius: 0.2rem;padding-top: 0.35rem;margin-right: 0.1rem;}
.goodsitemImg{width:2.0rem;height:2.0rem;}
.goodsitem-img{flex:1;padding-left:0.2rem;}
.goodsitem-content{flex:3;display: flex;flex-direction: column;}
.goodsitem-title{font-size:0.35rem;padding: 0.1rem 0.2rem;}
.goodsitem-subtitle{font-size:0.25rem;padding:0.1rem 0.2rem;color:#ccc;}
.goodsitem-priceitem{display: flex;padding: 0.1rem 0.2rem;}
.goodsitem-price{flex:2;color:#9F000D;font-size:0.4rem;}
.goodsitem-btn{flex:1;}
::v-deep .van-checkbox{margin-right:auto;}
.shop-from{padding-left:0.2rem;font-size:0.3rem;color:#cccccc;}
</style>



 
 
 
 