<template>
	<view class="content">
		<my-header :seller="seller"></my-header>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#F01414"></uni-segmented-control>
		<view class="content-wrapper">
			<view class="content-item" v-if="current === 0">
				<my-goods :seller="seller"></my-goods>
			</view>
			<view class="content-item" v-if="current === 1">
				<ratings :seller="seller"></ratings>
			</view>
			<view class="content-item" v-if="current === 2">
				<seller :seller="seller"></seller>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from "../../components/header/header.vue"
	import Tab from '../../components/uni-segmented-control/uni-segmented-control.vue'
	import Goods from '../../components/goods/goods.vue'
	import Ratings from '../../components/ratings/ratings.vue'
	import Seller from '../../components/seller/seller.vue'
	export default {
		data() {
			return {
				// title: 'Hello',
				seller: {},
				items: ['商品', '评论', '商家'],
				current: 0
			}
		},
		onLoad() {
			this.getHeaderInfo()
		},
		methods: {
			async getHeaderInfo() {
				// #ifdef H5
				const res = await this.$http({
					url: '/api/seller'
				})
				this.seller = res.data.data
				// #endif
				// #ifndef H5
				// const res = await this.$http({
				// 	url: '/seller'
				// })
				const appData = require('../../util/data.json')
				// console.log(appData)
				this.seller = appData.seller
				// console.log('11')
				// #endif
				// console.log(res.data.data)
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		},
		components: {
			"my-header": Header,
			"uni-segmented-control": Tab,
			"my-goods": Goods,
			"ratings": Ratings,
			"seller": Seller
		}
	}
</script>

<style>
	my-header {
		height: 750rpx;
	}
</style>
