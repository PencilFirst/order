import Vue from 'vue'
import App from './App'
import {myRequest} from './util/api.js'
import './static/fonts/iconfont.css'

Vue.prototype.$http = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
