<template>
        <div class='shopshow-container' v-if='bg!=undefined' :style="{ 'background-image': 'url(' + bg + ')' }">
              <div class='shopshow-title' v-if='title!=null'>{{title}}</div>
              <div class='shopshow-items'><slot></slot></div>
        </div>
</template>
<script>
export default {
  name: 'ShopShow',
  props: {
    title:String,  
    bg: String
  }
}
</script>
<style scoped>
.shopshow-container{padding: 0.3rem;background-color:#ffffff;border-radius:0.2rem;margin-top:0.2rem;position: relative;}
.shopshow-title{font-size: 0.5rem;font-weight: 600;text-align: left;padding: 0.25rem;}
.shopshow-items{display: flex;overflow-x: scroll;overflow-y: hidden;}
::-webkit-scrollbar {display: none;}
</style>


