<template>
  <div id='setting'>
       <NavTop title='设置'/>
         <van-cell-group inset>
            <van-cell title-class='btnexit' @click='doExit()'>
                <template #title>
                     退 出   
                </template>   
            </van-cell>    
         </van-cell-group>   
  </div>
</template>
<script>
import {Cell, CellGroup } from 'vant'
import NavTop from '@/components/navtop'

export default {
   name: 'setting',
   data() {
        return {
    
        };
   }, 
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
           
      },
      doExit(){
          this.$store.dispatch("doLogout")
          this.$router.push("/login")
      }
   },
   components: {
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        NavTop
   }
}
</script>
<style scoped>
#setting{background-color:#F6F6F6;min-height: 100vh;padding-top:60px;}
.btnexit{text-align: center;}
</style>