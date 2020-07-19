<template>
	<view class="order">
		<view class="order-content" v-show="orderList.length">
			<view class="order-item" v-for="(item,index) in orderList" :key="index">
				<view class="pic">
					<image src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" mode="widthFix"></image>
				</view>
				<view class="content">
					<view class="title">
						粥品香坊(回龙观)
					</view>
					<view class="time">
						{{item.orderNumber|formatDate}}
					</view>
					<view class="goods">
						<view class="goods-item" v-for="(item,goods) in item.orderItem" :key="goods">
							<view class="goods-title">{{item.name}}<text class="goods-count">x{{item.count}}</text></view>
							<view class="price">￥<text class="number">{{item.count*item.price}}</text></view>
						</view>
						<view class="total">
							实付<view class="total-price">￥<text class="number">{{item.totalPrice}}</text></view>
						</view>
					</view>
				</view>
				<view class="status">
					<text v-if="item.status === 1">已完成</text>
					<text v-else>待取餐</text>
				</view>
			</view>
		</view>
		<view class="no-result" v-show="!orderList.length">
			您还没有下过单哟，亲~
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '../../util/date.js'
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {
			// ...mapMutations(['])
		},
		computed: {
			...mapState(['orderList']),
			...mapGetters(['getTotalPrice'])
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	}
</script>

<style>
	.order {
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
		padding-top: 14rpx;
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

	.goods .total {
		margin-top: 20rpx;
		border-top: 2rpx solid rgba(7, 17, 27, .1);
		font-size: 28rpx;
		font-weight: 700;
	}

	.goods .total .number {
		font-size: 36rpx;
	}

	.goods-item .goods-count {
		margin-left: 14rpx;
	}
</style>
