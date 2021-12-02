<template>
        <div class='badge-container' >
            {{title}}
        </div>
</template>
<script>
export default {
  name: 'Badge',
  props: {
    title:String
  }
}
</script>
<style scoped>
.badge-container{padding: 0.1rem;background-color:#ffffff;border-radius:0.2rem;border:1px solid #CB5A49;color:#CB5A49;display: inline;margin-right:2px;}
</style>


