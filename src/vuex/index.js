import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import moduleUser from './module/user.js'
import moduleShop from './module/shop.js'
import moduleAddress from './module/address.js'

Vue.use(Vuex)

const store= new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
      user: moduleUser,
      shop: moduleShop,
      address: moduleAddress
    }
})
export default store
