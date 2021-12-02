 <template>
  <div>
      <van-submit-bar :price="total*100" :button-text="btntext" @submit="onSubmit" :tip="tip" tip-icon="info-o">  
        <div class='shop_cart_icon' @click='popShopCart()'>
            <van-badge :content="totalnums">
                  <van-icon name='cart' size='18'/>
              </van-badge>
        </div>   
        </van-submit-bar>   
        <van-action-sheet v-model="iscartshow" title="购物车">
              <div class="cart-content">
                      <slot></slot>
                      <van-submit-bar :price="total*100" :button-text="btntext" @submit="onSubmit" :tip="tip" tip-icon="info-o">                        
                          <div class='shop_cart_icon' @click='popShopCart()'>
                              <van-badge :content="totalnums">
                                    <van-icon name='cart' size='18'/>
                                </van-badge>
                          </div>   
                      </van-submit-bar>
              </div>
        </van-action-sheet> 
  </div>
</template>
<script>
import {SubmitBar,ActionSheet,Icon,Badge  } from 'vant'
export default {
  data(){
      return{
          iscartshow:false
      }
  },  
  name: 'ShopCart',
  props: {
     tip:String,
     btntext:String
  },
  computed:{
     total(){
       return this.$store.getters.carttotal(this.$store.state.shop.clicked)
     },
     totalnums(){
       return this.$store.getters.totalnums(this.$store.state.shop.clicked)
     }
  },
  methods:{
      onSubmit(){
         if(this.total==0){
           this.$toast("请先添加商品到购物车")
           return false
         }
         this.$router.push('/order')   
      },
      popShopCart(){
        this.iscartshow=!this.iscartshow
      }
  },
  components:{
    [SubmitBar.name]:SubmitBar,
    [ActionSheet.name]:ActionSheet,
    [Icon.name]:Icon ,
    [Badge.name]:Badge 
  }
}
</script>
<style scoped>
.shop_cart_icon{width: 1rem;height: 1rem;border-radius: 50%;display: flex;align-items: center;background-color: #eee;justify-content: center;margin-left: 0.3rem;}
.cart-content{ padding: 0 16px 100px;}
</style>



 
 
 
 