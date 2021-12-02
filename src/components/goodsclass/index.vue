<template>
        <div class='goodsclass-container'>
               <span class='goodsclass-title' >
                {{title}}<slot name="right"></slot>
               </span>
              <span class='goodsclass-subtitle' v-if='subtitle!=null'>{{subtitle}}</span>
              <slot></slot>
        </div>
</template>
<script>
export default {
  name: 'GoodsClass',
  props: {
    title:String,  
    subtitle: String
  }
}
</script>
<style scoped>
.goodsclass-container{padding: 0.3rem;background-color:#ffffff;margin-top:0.2rem;text-align: left;}
.goodsclass-title{font-size: 0.4rem;font-weight: 600;text-align: left;padding: 0.25rem 0.25rem 0.25rem 0;}
.goodsclass-subtitle{font-size:0.25rem;text-align: left;color:#ccc;}
</style>


