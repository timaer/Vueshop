<template>
  <div id='addressedit'>
       <NavTop title='地址编辑'/>
        <van-address-edit
            :area-list="areaList"
            :address-info="addressinfo"
            show-postal
            show-delete
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
  </div>
</template>
<script>
import {AddressEdit ,Area } from 'vant';
import { areaList } from '@vant/area-data';
import NavTop from '@/components/navtop'

export default {
   name: 'addressedit',
   data() {
        return {
           areaList:areaList,
           addressinfo:{}
        };
   }, 
   created(){
        this.getList(); 
   },
   methods: {
      getList(){
          if(this.$route.params.id!=undefined){
               this.$post('/address/getAddressInfo',{id:this.$route.params.id}).then((data)=>{
                   if(data.result.success){
                         this.addressinfo=data.result.info
                   }else{
                         this.$toast(data.result.info)
                   }                  
               })
          }
      },
      onSave(content) {
          if(content.name==''||content.tel==''||content.province==''||content.city==''||content.county==''){
             this.$toast("请检查输入内容");
             return false
          }
          
          content['id']=this.$route.params.id===undefined ? 0 :this.$route.params.id
          this.$post('/address/saveAddress',{content:content}).then((data)=>{
             if(data.result.success){ 
                this.$toast(data.result.info)
                setTimeout(()=>{ this.$router.push('/addresslist/'+this.$route.params.from)},1000)
             }else{
                this.$toast(data.result.info)
             }
          })
      },
      onDelete(item) {
          this.$post("/address/delAddress",{id:item.id}).then((data)=>{
             if(data.result.success){
                this.$toast(data.result.info)
                if(item.id==this.$store.state.address.choosedaddress.id) this.$store.commit("SET_ADDRESS",{address:{}})
                setTimeout(()=>{this.$router.push('/addresslist/'+this.$route.params.from)},500) 
             }else{
                this.$toast(data.result.info)
             }
          }) 
      },
   },
   components: {
        [AddressEdit.name]: AddressEdit ,
        [Area.name]: Area ,
        NavTop
   }
}
</script>
<style scoped>
#addressedit{background-color:#F6F6F6;min-height: 100vh;padding-top:60px;z-index:999;}
::v-deep .van-cell__title, .van-cell__value { text-align: left;}

</style>