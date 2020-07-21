import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// totalPrice: [],
		orderList: [],
		goods: []
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
		},
		getGoods(state, goods) {
			state.goods = goods
		},
		add(state, payload) {
			// console.log(payload)
			let {
				first,
				second
			} = payload
			console.log(first, second)
			if (!state.goods[first].foods[second].count) {
				Vue.set(state.goods[first].foods[second], 'count', 1)
			} else {
			state.goods[first].foods[second].count++	
			}
		},
		desc(state, payload) {
			let {
				first,
				second
			} = payload
			if (state.goods[first].foods[second].count) {
				state.goods[first].foods[second].count--
			}
		},
		empty(state) {
			state.goods.forEach((good) => {
				good.foods.forEach(food => {
					Vue.set(food,'count',0)
				})
			});
		},
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
		},
		selectFoods(state) {
			let foods = [];
			state.goods.forEach((good, goodIndex) => {
				good.foods.forEach((food, foodIndex) => {
					if (food.count) {
						Vue.set(food, 'payload', {
							first: goodIndex,
							second: foodIndex
						})
						foods.push(food);
					}
				});
			});
			return foods;
		},

	},
	actions: {

	}
})
export default store
