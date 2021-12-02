<template>
  <div id='order'>
        <NavTop title='确认订单' :islink='true' linkurl='/index'/>
        <van-cell-group inset>
                    <van-cell is-link to="/addresslist/order" title-class="address_title" value-class="address_label" v-if='isSetAddr'>
                        <template #title>
                            <van-icon name="location-o" /><span class='address_con'>{{choosedAddr.province}}{{choosedAddr.city}}{{choosedAddr.county}}{{choosedAddr.address}}</span>
                        </template>
                        <template #label>
                            {{choosedAddr.name}} {{choosedAddr.tel}}
                        </template>        
                    </van-cell>
                    <van-cell is-link to="/addresslist/order" title-class="address_empty" value-class="address_label" v-else>
                        <template #title>
                            <van-icon name="add-o"  size="0.6rem" /><span class='address_add'>添加邮寄地址</span>
                        </template>     
                    </van-cell>
        </van-cell-group>  
        <van-cell-group inset>
           <van-cell>
               <template #title>
                  <div class='title'>{{shopname}}</div>
                  <div class='goodsitem'>
                        <div class='cellitem' v-for='item in cartlist' :key='item.id'>
                              <div class='goodsimg'><img :src='item.headimg'/></div>
                              <div class='info'>
                                 <div class='line'><div class='goodstitle'>{{item.name}}</div><div class='price'>¥{{item.price}}</div></div>
                                 <div class='line'><div class='subprice'>x{{item.nums}}</div><div class='dashprice'>¥{{item.dashprice}}</div></div>
                              </div>
                        </div>
                        <div class='cellitem'>
                           <div class='celltitle'>红包/优惠券</div>
                           <div class='cellright'><span>无红包可用</span><van-icon name="arrow" color='#969799'/></div>
                        </div>
                        <div class='cellitem'>
                           <div class='celltitle'>优惠说明</div>
                           <div class='cellright'>总价:{{dashtotal}}  优惠:-{{discount}} </div>
                        </div>
                  </div>   
               </template>   
           </van-cell> 
        </van-cell-group> 
        <van-cell-group inset>
            <van-cell title-class="address_title_short" value-class="address_value_long" is-link @click='toggleMemo()'>
                <template #title>备注</template>
                <template #default>{{memo_val}}</template>
            </van-cell>  
            <van-cell title-class="address_title_short" value-class="address_value_long" is-link @click='toggleDinnerware()'>
                <template #title>餐具份数</template>
                <template #default>{{dinnerware_val}}</template>
            </van-cell>   
         </van-cell-group>
        <van-submit-bar :price="realtotal*100" button-text="提交订单" @submit="onSubmit" />
        <van-action-sheet v-model="dinnerware_show" >
            <div class="dinnerware_content">
                 <van-picker
                     title="请选择餐具数量"
                     show-toolbar
                     :columns="columns"
                     @confirm="onConfirm"
                     @cancel="onCancel"
                     />
            </div>
        </van-action-sheet>
        <van-action-sheet v-model="memo_show" >
            <div class="memo_content">
                  <van-field
                     v-model="memo_val"
                     rows="2"
                     autosize
                     label="买家备注"
                     type="textarea"
                     maxlength="100"
                     placeholder="请输入备注文字"
                     show-word-limit
                 />
               <div style="margin: 16px;">
                     <van-button round block type='warning' @click='toggleMemo()'>确定</van-button>
               </div>
            </div>
        </van-action-sheet>
  </div>
</template>
<script>
import { SubmitBar,Cell, CellGroup,Icon ,ActionSheet ,Picker,Form ,Field,Button } from 'vant';
import NavTop from '@/components/navtop'

export default {
   name: 'order',
   data() {
      return {
          dinnerware_show:false,
          memo_show:false,
          columns: ['一份', '二份', '三份', '四份', '五份', '六份', '七份', '八份'],

          memo_val:'',
          dinnerware_val:'无须餐具',
          processing:false
      }
   }, 
   computed:{
      shopname(){
          return this.$store.getters.fromshop
      },  
      isSetAddr(){
          return Object.keys(this.$store.state.address.choosedaddress).length===0 ? false :true
      },
      choosedAddr(){
          return this.$store.state.address.choosedaddress
      },
      dashtotal(){
          return this.$store.getters.dashtotal()
      },
      realtotal(){
          return this.$store.getters.carttotal(this.$store.state.shop.clicked)
      },
      discount(){
          return this.$store.getters.cartdiscount()
      },
      cartlist(){
          return this.$store.state.shop.cartlist
      }
   },
   created(){
      this.getList()
   },
   methods: {
      getList(){ 
           if(!this.isSetAddr){
                    this.$post("/address/getDefaultAddr",{}).then((data)=>{
                    if(data.result.success) { 
                        this.$store.commit("SET_ADDRESS",{address:data.result.info})
                    }
              })
           }
      },
      onSubmit(){
            if(this.dinnerware_val==''){
                 this.$toast("请选择餐具份数");
                 return false;
            }
            if(!this.isSetAddr){
                this.$toast("请先设置收货地址");
                return false;
            }
            if(this.processing){
                this.$toast("请耐心等待提交完成");
                return false;
            }
            let orderinfo=[]
            orderinfo['shopid']=this.$store.state.shop.shopid
            orderinfo['goodslist']=this.$store.state.shop.cartlist
            orderinfo['memo']=this.memo_val
            orderinfo['dinnerware']=this.dinnerware_val
            orderinfo["discount"]=0
            orderinfo["total"]=this.realtotal
            orderinfo["addressinfo"]=this.$store.state.address.choosedaddress
            this.processing=true
            this.$post("/order/Order",{orderinfo:orderinfo}).then((data)=>{
                if(data.result.success){ 
                    this.$store.commit("EMPTY_CART")
                    this.$router.push("/payment/"+data.result.info)
                }else{
                    this.$toast(data.result.info)
                }
                this.processing=false
            })
            
      },
      onConfirm(value) {
            this.dinnerware_val=value
            this.toggleDinnerware()
      },
      onCancel() {
            this.toggleDinnerware()
      },
      toggleMemo(){
            this.memo_show=!this.memo_show
      },
      toggleDinnerware(){
            this.dinnerware_show=!this.dinnerware_show
      }
   },
   components: {
        [SubmitBar.name]: SubmitBar ,
        [Cell.name]: Cell ,
        [CellGroup.name]: CellGroup ,
        [Icon.name]: Icon ,
        [ActionSheet.name]: ActionSheet , 
        [Picker.name]: Picker,
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button,
        NavTop
   }
}
</script>
<style scoped>
#order{background-color:#F6F6F6;min-height: 100vh;padding-top:60px;padding-bottom: 85px;}
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