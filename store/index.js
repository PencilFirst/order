import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// totalPrice: [],
		orderList: []
	},
	mutations: {
		putOrder(state, order) {
			// state.orderList.push(order)
			state.orderList = state.orderList.concat(order)
			// state.orderList = state.orderList.push(order)
		},
		changeOrderStatus(state, orderNumber) {
			// const _this = this
			state.orderList.forEach((item) => {
				item.orderNumber === orderNumber ? Vue.set(item, 'status', 1) : ''
				// item.status = 1

			})
		}
	},
	getters: {
		getTotalPrice(state) {
			let total = 0
			state.orderList.forEach((item) => {
				total += item.totalPrice
			})
			// console.log(total)
			return total
		},
		getUnfinshOrder(state) {
			const unfinishList = []
			state.orderList.forEach((item) => {
				item.status == 0
				unfinishList.push(item)
			})
			return unfinishList
		}
	},
	actions: {

	}
})
export default store
