<template>
	<view class="take-order">
		<view class="order-content" v-show="orderList.length">
			<view class="order-item" v-for="(item,index) in orderList" :key="index" v-if="item.status === 0">
				<view class="pic">
					<image src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" mode="widthFix"></image>
				</view>
				<view class="content">
					<view class="title">
						粥品香坊(回龙观)
					</view>
					<view class="goods">
						<view class="goods-item">
							<view class="goods-name">
								<text class="title">{{item.orderItem[0].name}}</text>
								<text class="quantity">等{{item.totalCount}}件商品</text>
							</view>
							<text class="price">￥<text class="number">{{item.totalPrice}}</text></text>
						</view>
					</view>
					<view class="opt" @tap="takeOut(index)">
						<view class="button">
							取餐
						</view>
					</view>
				</view>
				<view class="status">
					<text>待取餐</text>
				</view>
			</view>
		</view>
		<view class="no-result" v-show="!show.length">
			亲，您还没有下单哟~
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				// unfinshOrder: []
				// show: false

			}
		},
		methods: {
			...mapMutations(['changeOrderStatus']),
			// ...mapActions(['changeOrderStatus']),
			takeOut(index) {
				const _this = this
				uni.showModal({
					title: '取餐',
					content: '是否确认取餐',
					success(res) {
						if (res.confirm) {
							let number = _this.orderList[index].orderNumber
							_this.changeOrderStatus(number)
							uni.showToast({
								title: '成功取出',
								icon: 'success'
							})	
						} else if (res.cancel) {
							uni.showToast({
								title: '已取消',
								icon: 'none'
							})
						}
					}
				})
			}
		},
		computed: {
			// ...mapState(['orderList']),
			...mapGetters({
				orderList: 'getUnfinshOrder'
			}),
			show() {
				let res = this.orderList.filter(item => {
					// console.log(item.status)
					if(item.status === 0) return true

				})
				console.log(res)
				return res
			}
		},
		created() {
			// this.orderList = this.getUnfinshOrder
		}
	}
</script>

<style>
	.take-order {
		background-color: #F8F8F8;
	}

	.order-item {
		width: 94%;
		background-color: #FFFFFF;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		border-radius: 30rpx;
		margin: 0 auto 20rpx auto;
		padding: 30rpx;
		position: relative;
	}

	.order-item .pic {
		width: 72rpx;
		height: 72rpx;
		flex: 0 0 72rpx;
		margin-right: 20rpx;
	}

	.order-item .pic image {
		width: 100%;
		height: 100%;
	}

	.order-item .content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 28rpx;
		align-items: flex-start;
		width: 100%;
	}

	.order-item .content .title {
		font-size: 32rpx;
		font-weight: 700;
	}

	.order-item .content .time {
		font-size: 24rpx;
		color: rgba(7, 17, 27, .5);
	}

	.goods {
		width: 100%;
	}

	.order-item .content .goods .goods-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.order-item .total {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.order-item .status {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		display: block;
		color: rgba(240, 20, 20, .8);
	}

	.goods .price {
		font-size: 28rpx;
		font-weight: 700;
	}

	.goods .price .number {
		font-size: 36rpx;
	}

	.order-item .opt {
		box-sizing: border-box;
		width: 100% !important;
		margin-top: 20rpx;
		border-top: 2rpx solid rgba(7, 17, 27, .1);
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.opt .button {
		/* border: 2rpx solid rgba(7,17,27,.1); */
		border: 2rpx solid rgba(224, 224, 224, 1);
		padding: 20rpx 40rpx;
		margin: 20rpx 20rpx 0 20rpx;
		border-radius: 40rpx;
		color: rgb(240, 20, 20);
		background-color: rgb(248, 248, 248);
	}

	.goods .goods-item .goods-name {
		display: flex;
		width: 100%;
	}

	.goods .goods-item .goods-name .title {
		max-width: 50%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28rpx;
		font-weight: lighter;
	}

	.goods .goods-item .goods-name .quantity {
		margin-left: 12rpx;
	}

	.no-result {
		width: 100vw;
		height: 100vh;
		font-size: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
