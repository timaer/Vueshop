<template>
    <div class='price-container'>
        <div class='price-btn' v-if="type!='inline'" @click="dec()">-</div>
        <div class='price-input' v-if="type!='inline'"><input :value='cartnums' readonly/></div>
        <div class='price-btn' @click="add()">+
            <div class='price-badge' v-if="type=='inline'">
                <van-badge :content="cartnums"></van-badge>
            </div>  
        </div>      
    </div>
</template>
<script>
import { Badge } from 'vant';
export default {
  computed:{
     cartnums(){
       return this.$store.getters.itemnums(this.item.id,this.$store.state.shop.clicked)
     }
  },
  name: 'Nums',
  props: {
    type:String, 
    item: Object
  },
  components:{
      [Badge.name]:Badge
  },
  methods:{
      add(){
         this.$store.dispatch('addToCart',{goodsItem:this.item}).then((data)=>{
             if(!data.success) this.$toast(data.info)
         })
      },
      dec(){
         this.$store.commit('DEL_FROM_CART',{goodsItem:this.item})
      }
  }
}
</script>
<style scoped>
.price-container{display: flex;align-items: center;position: relative;justify-content: center;}
.price-btn{font-size:0.5rem;min-width: 12px;min-height: 12px;width:0.5rem;height:0.5rem;border-radius: 50%;background-color: #BC010B;color:#ffffff;position: relative;display: flex;align-items: center;justify-content: center;}
.price-badge{position: absolute;top:-0.25rem;right:-0.25rem;}
.price-input input{min-width:12px;outline: none;width:0.5rem;border: none;text-align: center;}
</style>


