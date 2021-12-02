
<template>
        <van-nav-bar :fixed='true' left-arrow>
                <template #title>
                    <span v-if="title!=''">{{title}}</span>
                </template>
                <template #left>
                    <van-icon name="arrow-left" size="18" @click="goback()" :color='color' />
                </template>
                <template #right>
                    <slot name="rightcon"></slot>
                </template>
        </van-nav-bar>
</template>
<script>
import { NavBar,Icon} from 'vant';
export default {
   name: 'NavTop',
   props:{
      title:{type:String,default:''},
      color:{type:String,default:'#333333'},
      islink:{type:Boolean,default:false},
      linkurl:{type:String,default:'/index'}
   },
   methods: {
      goback() {
         if(this.islink){
            this.$router.push(this.linkurl)
         }else{
            this.$router.go(-1);
         } 
      }
   },
   components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon
   }
}
</script>
<style scoped>
::v-deep .van-search{position:fixed;width:100%;top:0;left:0;}
::v-deep .van-field__right-icon{display:flex;}
::v-deep .van-nav-bar{background-color: transparent;}
::v-deep [class*=van-hairline]::after{border: none;}
</style>