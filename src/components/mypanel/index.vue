<template>
        <div class='mypanel-container'>
              <div class='mypanel-title' v-if='title!=null'>{{title}}</div>
              <div class='mypanel-items'><slot></slot></div>
        </div>
</template>
<script>
export default {
  name: 'MyPanel',
  props: {
    title: String
  }
}
</script>
<style scoped>
.mypanel-container{padding: 0.3rem;background-color:#ffffff;border-radius:0.2rem;margin-top:0.2rem;}
.mypanel-title{font-size:0.40rem;font-weight: 600;text-align: left;padding: 0 0.15rem 0.1rem;}
.mypanel-items{display: flex;flex-direction: row;align-content: center;justify-content: space-around;  flex-wrap: wrap;}
</style>


