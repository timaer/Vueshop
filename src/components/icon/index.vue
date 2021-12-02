<template>
      <svg :class="classname!=null?'svgClass '+classname:'svgClass'" aria-hidden='true' @click="$emit('click')"><use :xlink:href="'#'+src" /></svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    src: String,
    classname:String
  },
  created(){
    
  },
  method:{
    
  }
}
</script>
<style scoped>
  .svgClass{display:inline-block;width:0.5rem;height:1em;padding:0.06rem;}
</style>


