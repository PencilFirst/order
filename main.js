import Vue from 'vue'
import App from './App'
import {
	myRequest
} from './util/api.js'
import './static/fonts/iconfont.css'
import store from './store/index.js'

Vue.prototype.$http = myRequest
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
