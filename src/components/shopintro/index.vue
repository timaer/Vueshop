<template>
        <div class='shopintro-container'>
              <div class='shopintro-top'>
                  <div class='shopintro-topcon'>
                      <div class='shopintro-title' v-if='title!=null'>{{title}}</div>
                      <div class='shopintro-subtitle' v-if='subtitle!=null'>{{subtitle}}</div>
                  </div>
                  <div class='shopintro-topimg'>
                      <img :src='logo' class='shoplogo'/>
                  </div>    
              </div>
              <div class='shopintro-desc' v-if='desc!=null'>{{desc}}</div>
              <slot></slot>
        </div>
</template>
<script>
export default {
  name: 'ShopIntro',
  props: {
    title:String,  
    subtitle: String,
    desc:String,
    logo:String
  }
}
</script>
<style scoped>
.shopintro-container{text-align:left;padding: 0.3rem;background-color:#ffffff;border-radius:0.2rem;margin-top:0.2rem;position: absolute;width:calc(100% - 1.2rem);left: 0.3rem;top:3rem;min-height: 3rem;}
.shopintro-title{font-size: 0.5rem;font-weight: 600;text-align: left;padding: 0.2rem 0.2rem 0 0.1rem;}
.shopintro-subtitle{font-size:0.35rem;padding: 0.1rem 0.1rem 0 0.1rem;}
.shopintro-desc{font-size:0.3rem;padding: 0.1rem 0.1rem 0 0.1rem;color:#ccc;margin-bottom: 0.2rem;}
.shopintro-top{display: flex;}
.shopintro-topcon{flex:4;}
.shopintro-topimg{border-radius: 0.2rem;flex:1;width:0.3rem;height:0.3rem;}
.shoplogo{border-radius: 0.2rem;width:100%;}
</style>


