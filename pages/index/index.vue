<template>
	<view class="content">
		<my-header :seller="seller"></my-header>
	</view>
</template>

<script>
	import Header from "../../components/header/header.vue"
	export default {
		data() {
			return {
				// title: 'Hello',
				seller: {}
			}
		},
		onLoad() {
			this.getHeaderInfo()
		},
		methods: {
			async getHeaderInfo() {
				const res = await this.$http({
					url: '/api/seller'
				})
				console.log(res.data.data)
				this.seller = res.data.data
			}
		},
		components: {
			"my-header": Header
		}
	}
</script>

<style>
	my-header {
		height: 750rpx;
	}
</style>
