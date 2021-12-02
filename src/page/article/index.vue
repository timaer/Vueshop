<template>
        <div id='article'>
              <NavTop :title='article.title'/>
              <div class='content'>
                  {{article.content}}
              </div>    
        </div>
</template>
<script>
import NavTop from '@/components/navtop'
export default {
  data(){
      return{
         article:{title:'隐私政策',content:"lasdkfjlsakdjfkasdfijoiyweqirqiwuerhbqjkwerhkjwqehrkjheiwuqriweqrwieqhriqsadfsadfasdfasdfsdaf"}
      }
  },  
  name: 'Article',
  components:{
      NavTop
  }
}
</script>
<style scoped>
#article{background-color:#F6F6F6;min-height: 100vh;padding-top:50px;}
.content{font-size:0.5rem;overflow-x:hidden;word-break:break-all;text-align: left;padding: 0.35rem;}
</style>


