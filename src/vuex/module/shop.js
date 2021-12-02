const moduleShop={    
    state: {
        clicked:0,    //clicked和checkstate仅用于同步刷新数据
        checkstate:1,

        shopid:0,
        shopname:'',
        cartlist:[]
    },
    getters:{
        fromshop:state=>{
            return state.cartlist.length>0 ? state.cartlist[0].shopname : state.shopname
        },
        fromshopid:state=>{
            return state.cartlist.length>0 ? state.cartlist[0].shopid : state.shopid
        },
        //普通结算
        itemnums:(state)=>(id,clicked)=>{
            if(!clicked) return 0
            for(let i=0;i<state.cartlist.length;i++){
                if(id==state.cartlist[i].id) {
                    return state.cartlist[i].nums
                }
            }
            return 0
        },
        totalnums:(state)=>(clicked)=>{
            if(!clicked) return 0
            let total=0
            for(let i=0;i<state.cartlist.length;i++){
                total+=state.cartlist[i].nums
            }
            return total
        },
        carttotal:(state)=>(clicked)=>{
            if(!clicked) return 0
            let total=0
            for(let i=0;i<state.cartlist.length;i++){
                total+=state.cartlist[i].nums*state.cartlist[i].price
            }
            return total.toFixed(2)
        },
        dashtotal:(state)=>()=>{
            let total=0
            for(let i=0;i<state.cartlist.length;i++){
                total+=state.cartlist[i].nums*state.cartlist[i].dashprice
            }
            return total.toFixed(2)
        },
        cartdiscount:(state)=>() =>{
            let discount=0
            for(let i=0;i<state.cartlist.length;i++){
                discount+=(state.cartlist[i].dashprice-state.cartlist[i].price)*state.cartlist[i].nums
            }
            return discount.toFixed(2)
        },
    
        //购物车结算
        checkedcart:state=>()=>{
            let checkedgoods=[]
            for(let i=0;i<state.cartlist.length;i++){
                if(state.cartlist[i].checked){
                    checkedgoods.push(state.cartlist[i])
               }
            }
            return checkedgoods
        },
        checkedcarttotal:(state)=>(clicked,checked)=>{
                if(!checked||!clicked) return 0
                let total=0
                for(let i=0;i<state.cartlist.length;i++){
                    if(state.cartlist[i].checked==true) total+=state.cartlist[i].nums*state.cartlist[i].price
                }
                return total.toFixed(2)
        },
        checkeddashtotal:(state)=>()=>{
            let total=0
            for(let i=0;i<state.cartlist.length;i++){
                if(state.cartlist[i].checked==true) total+=state.cartlist[i].nums*state.cartlist[i].dashprice
            }
            return total.toFixed(2)
        },
        checkedcartdiscount:(state)=>() =>{
            let discount=0
            for(let i=0;i<state.cartlist.length;i++){
                if(state.cartlist[i].checked==true) discount+=(state.cartlist[i].dashprice-state.cartlist[i].price)*state.cartlist[i].nums
            }
            return discount.toFixed(2)
        },
        checkedtotalnums:(state)=>()=>{
                let total=0
                for(let i=0;i<state.cartlist.length;i++){
                    if(state.cartlist[i].checked==true) total+=state.cartlist[i].nums
                }
                return total
        },
        realtimecartlist:(state)=>(checked)=>{
             if(!checked) return []
             return state.cartlist
        }
    },
    mutations: {
        SET_SHOP:(state,payload)=>{
            state.shopid=payload.shopid
            state.shopname=payload.shopname
        },
        ADD_TO_CART:(state,payload)=>{
            state.clicked++
            let isNew=true
            for(let i=0;i<state.cartlist.length;i++){
                if(payload.goodsItem.id==state.cartlist[i].id){
                    state.cartlist[i].nums+=1
                    isNew=false
                    break
               }
            }
            if(isNew) {
                payload.goodsItem['nums']=1 
                state.cartlist.push(payload.goodsItem)
            }
        },

        DEL_FROM_CART:(state,payload)=>{
            state.clicked++
            for(let i=0;i<state.cartlist.length;i++){
                if(payload.goodsItem.id==state.cartlist[i].id){
                    if(state.cartlist[i].nums<=1){
                       state.cartlist.splice(i,1);
                    }else{
                       state.cartlist[i].nums-=1;
                    } 
               }
            }
        },
        EMPTY_CART:(state)=>{
            state.cartlist=[]
        },
        CHECK_GOODS:(state,payload)=>{
            state.checkstate++
            for(let i=0;i<state.cartlist.length;i++){
                if(payload.id==state.cartlist[i].id){
                    state.cartlist[i]['checked']=!state.cartlist[i]['checked']
                }
            }
        },
        CHECK_ALLGOODS:(state)=>{
            state.checkstate++
            for(let i=0;i<state.cartlist.length;i++){
                state.cartlist[i]['checked']=true
            }
        },
        DISCHECK_ALLGOODS:(state)=>{
            state.checkstate++
            for(let i=0;i<state.cartlist.length;i++){
                state.cartlist[i]['checked']=false
            }
        },
        DELETE_CHECKED:(state)=>{
            state.cartlist=state.cartlist.filter((item)=>item['checked']!=true)
        }
    },
    actions: {
       addToCart({commit,state},payload){
              let diffShop=false
              let initShopID=state.cartlist.length>0 ? state.cartlist[0].shopid :0
              for(let i=0;i<state.cartlist.length;i++){
                    if(payload.goodsItem.shopid!=initShopID){
                        diffShop=true;
                        break;
                    }
              }
              if(!diffShop){
                 commit('ADD_TO_CART',payload)
              }
              return new Promise((resolve) => {
                        if(diffShop){
                            commit("EMPTY_CART")
                            resolve({success:1,info:'OK'})
                        }else{
                            resolve({success:1,info:'OK'})
                        }   
              });
       }
    }
}

export default moduleShop