<template>
  <div id='index'>
       <van-search
        v-model="keywords"
        shape="round"
        background="#FA614F"
        placeholder="请输入搜索关键词"
        @change="doSearch()"
        >
         <template #right-icon>
           <van-button round type="warning" size="mini" @click="doSearch()">搜索</van-button>
         </template>
       </van-search>
        <div class='shopItemList'>
           <ShopItem 
            v-for="item in shoplist"
            :key="item.id"
            :headimg='item.headimg'
            :title='item.name'
            :subtitle='item.desc' 
            :url="'/shop/'+item.id" />
        </div> 
  </div>
</template>
<script>
import { Search,Button  } from 'vant';
import ShopItem from '@/components/shopitem'

export default {
   name: 'index',
   data() {
      return {
        keywords:'',
        shoplist:[]
      }
   }, 
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
          this.$post("/shop/getShopList",{}).then((data)=>{
            if(!data.result.success){
              this.$toast(data.result.info);return false
            }
            this.shoplist=data.result.info
          })
      },
      doSearch(){
          this.$post("/shop/getShopList",{keywords:this.keywords}).then((data)=>{
            if(!data.result.success){
              this.$toast(data.result.info);return false
            }
            this.shoplist=data.result.info
          })
      }
   },
   components: {
        [Search.name]: Search,
        [Button.name]: Button,
        ShopItem
   }
}
</script>
<style scoped>
#index{background-color:#F6F6F6;min-height: 100vh;}
.shopItemList{padding: 0.3rem;padding-bottom: 60px;margin-top:54px;}
::v-deep .van-search{position:fixed;width:100%;top:0;left:0;}
::v-deep .van-field__right-icon{display:flex;}
</style>