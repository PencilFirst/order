<template>
	<view class="content">
		<my-header :seller=seller></my-header>
		首页
	</view>
</template>

<script>
	import Header from "../../components/header/header.vue"
	export default {
		data() {
			return {
				// title: 'Hello',
				seller: {
					title: "品香粥铺"
				}
			}
		},
		onLoad() {

		},
		methods: {

		},
		components: {
			"my-header": Header
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
