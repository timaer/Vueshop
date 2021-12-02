import {post} from '@/api'
const moduleUser={
    state: {
        username:'',
        mobile:'',
        token:''    
    },
    mutations: {
        SET_USERNAME:(state,payload)=>{
            state.username=payload.username
        },
        SET_MOBILE:(state,payload)=>{
            state.mobile=payload.mobile
        },
        SET_TOKEN:(state,payload)=>{
            state.token=payload.token
        },
        LOG_OUT:(state)=>{
            state.username=''
            state.mobile=''
            state.token=''
        }
    },
    actions: {
        doLogin({commit},data){
            return new Promise((resolve,reject)=>{
                post("/login/doLogin",{username:data.username,password:data.password}).then((data)=>{
                    if(data.result.success){
                        commit("SET_USERNAME",{username:data.result.info.username})
                        commit("SET_MOBILE",{mobile:data.result.info.mobile})
                        commit("SET_TOKEN",{token:data.result.info.token})
                    }
                    resolve(data)
                    
                }).catch((error)=>reject(error));
            }).catch(()=>{})
        },
        doLogout({commit}){
            return new Promise((resolve)=>{
                commit("LOG_OUT")
                resolve(1)
            }).catch(()=>{})
        }
    }
}

export default moduleUser