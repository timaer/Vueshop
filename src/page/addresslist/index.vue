<template>
  <div id='addresslist'>
       <NavTop title='地址列表' :islink='true' :linkurl='backurl'/>
         <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select='onSelect'
         />
  </div>
</template>
<script>
import {AddressList} from 'vant';
import NavTop from '@/components/navtop'

export default {
   name: 'index',
   data() {
        return {
            chosenAddressId: '',
            list: [],
            backurl:''
        };
   }, 
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
          this.$post("/address/getAddressList").then((data)=>{
              if(data.result.success){
                    this.list=data.result.info.addresslist
                    this.chosenAddressId=Object.keys(this.$store.state.address.choosedaddress).length===0 ? 0: this.$store.state.address.choosedaddress.id
              }
          })
          this.backurl='/'+this.$route.params.from
      },
      onAdd(){
          this.$router.push({ name:'addressedit',params:{from:this.$route.params.from}})
      },
      onEdit(item){
          this.$router.push({ name:'addressedit',params:{id:item.id,from:this.$route.params.from}})
      },
      onSelect(item){
          this.$store.commit('SET_ADDRESS',{address:item})
          this.$router.push('/'+this.$route.params.from)
      }
   },
   components: {
        [AddressList .name]: AddressList,
        NavTop
   }
}
</script>
<style scoped>
#addresslist{background-color:#F6F6F6;min-height: 100vh;padding-top:60px;}
::v-deep .van-cell__title, .van-cell__value { text-align: left;}
</style>