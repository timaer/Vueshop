<template>
        <div class='panelitem-container'>
          <router-link :to="url">
            <div class='panelitem-icon'><Icon :src='icon' classname='panelIcon'/></div>
            <div class='panelitem-title'>{{title}}</div>  
            <div class='panelitem-title' v-if="desc!=''">{{desc}}</div>  
          </router-link>   
        </div>
</template>
<script>
import Icon from '@/components/icon'
export default {
  name: 'PanelItem',
  props: {
    icon: String,
    title:String,
    desc:{type:String,default:''},
    url:{type:String,default:''}
  },
  components:{
      Icon
  }
}
</script>
<style scoped>
.panelitem-container{display: flex;flex-direction: column;flex: 1 0 21%;}
.panelitem-container a{color:#333333;}
.panelitem-title{font-size:0.35rem;}
::v-deep .panelIcon{width:0.6rem;height:0.6rem;}
</style>


