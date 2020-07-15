<template>
	<view class="animation">
		<scroll-view class="food" v-show="showFlag" id="food" scroll-y="true">
			<view class="food-content">
				<view class="image-header">
					<view class="image">
						<image :src="food.image" mode="widthFix"></image>
					</view>
					<!-- <image :src="food.image" mode="widthFix"></image> -->
					<view class="back" @tap="hide">
						<text class="icon icon-arrow_lift"></text>
					</view>
				</view>
				<view class="content">
					<text class="title">{{food.name}}</text>
					<view class="detail">
						<text class="sell-count">月售{{food.sellCount}}份</text>
						<text class="rating">好评率{{food.rating}}%</text>
					</view>
					<view class="price">
						<text class="now">￥{{food.price}}</text>
						<text class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</text>
					</view>
					<view class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</view>
					<view class="animation">
						<!-- 购物车 -->
						<view class="buy" v-show="!food.count || food.count===0" @tap.stop="addFirst">
							加入购物车
						</view>
					</view>
				</view>
				<!-- <split></split> -->
				<view class="info" v-show="food.info">
					<view class="title">商品信息</view>
					<text class="text">{{food.info}}</text>
				</view>
				<!-- <split></split> -->
				<view class="rating">
					<text class="title">商品评价</text>
					<!-- <ratingselect></ratingselect> -->
					<view class="rating-wrapper">
						<view v-show="food.ratings && food.ratings.length">
							<view class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings">
								<view class="user">
									<text class="name">{{rating.username}}</text>
									<image :src="rating.avatar" mode="scaleToFill" class="avatar"></image>
								</view>
								<view class="time">
									{{rating.rateTime | formatDate}}
								</view>
								<text class="text">
									<!-- 留言内容 -->
									<text class="icon" :class=" {'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></text>
									{{rating.text}}
								</text>
							</view>
						</view>
						<view class="no-rating" v-show="!food.ratings || !food.ratings.length">
							暂无评价
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '../../util/date.js'
	import cartControl from '../cartcontrol/cartcontrol.vue'

	const ALL = 2;

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				// this.$nextTick(() => {
				// 	if (!this.scroll) {
				// 		this.scroll = new BScroll(this.$refs.food, {
				// 			click: true
				// 		});
				// 	} else {
				// 		this.scroll.refresh();
				// 	}
				// });
			},
			hide() {
				this.showFlag = false;
			},
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			addFirst() {
				this.$set(this.food, 'count', 1);
			},
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			"cartcontrol": cartControl
		}
	}
</script>

<style>
	.food {
		position: fixed;
		left: 0;
		top: 88rpx;
		bottom: 185rpx;
		/* bottom: 300rpx; */
		z-index: 30;
		width: 100%;
		background-color: #fff;
		transform: translate3d(0, 0, 0);
	}

	/* 动画 */
	.food .food-content .image-header {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}

	.food .food-content .image-header .image {
		position: absolute;
		/* top: 88rpx; */
		top: 0rpx;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.food .food-content .image-header .image image {
		width: 100%;
		height: 100% !important;
	}

	.food .image-header .back {
		position: absolute;
		/* top: 108rpx; */
		top: 20rpx;
		left: 0;
	}

	.food .image-header .back .icon-arrow_lift {
		display: block;
		padding: 20rpx;
		font-size: 40rpx;
		color: #fff;
	}

	.food .content {
		position: relative;
		padding: 36rpx;
	}

	.food .content .title {
		line-height: 28rpx;
		margin-bottom: 16rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: rgb(7, 17, 27);
	}

	.food .content .detail {
		margin-bottom: 36rpx;
		line-height: 20rpx;
		height: 20rpx;
		font-size: 0;
	}

	.food .content .detail .sell-count,
	.rating {
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}

	.food .content .detail .sell-count {
		margin-right: 24rpx;
	}

	.food .content .price {
		font-weight: 700;
		line-height: 48rpx;
	}

	.food .content .price .now {
		margin-right: 16rpx;
		font-size: 28rpx;
		color: rgb(240, 20, 20);
	}

	.food .content .price .old {
		text-decoration: line-through;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}

	.food .content .cartcontrol-wrapper {
		position: absolute;
		right: 24rpx;
		bottom: 24rpx;
	}

	.food .content .buy {
		position: absolute;
		right: 36rpx;
		bottom: 36rpx;
		z-index: 10;
		height: 48rpx;
		line-height: 48rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
		font-size: 20rpx;
		color: #fff;
		background-color: rgb(0, 160, 220);
		opacity: 1;
	}

	/* 动画 */
	.food .info {
		padding: 36rpx;
	}

	.food .info .title {
		line-height: 28rpx;
		margin-bottom: 12rpx;
		font-size: 28rpx;
		color: rgb(7, 17, 27);
	}

	.food .info .text {
		line-height: 48rpx;
		padding: 0 16rpx;
		font-size: 24rpx;
		color: rgb(77, 85, 93);
	}

	.food .rating {
		padding-top: 36rpx
	}

	.food .rating .title {
		line-height: 14rpx;
		margin-left: 36rpx;
		font-size: 28rpx;
		color: rgb(7, 17, 27);
	}

	.food .rating-wrapper {
		padding: 0 36rpx;
	}

	.food .rating-wrapper .rating-item {
		position: relative;
		padding: 32rpx 0;
	}

	.food .rating-wrapper .rating-item::after {
		content: '';
		display: block;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.food .rating-wrapper .rating-item .user {
		position: absolute;
		right: 0;
		top: 32rpx;
		line-height: 24rpx;
		font-size: 0;
	}

	.food .rating-wrapper .rating-item .user .name {
		display: inline-block;
		margin-right: 12rpx;
		vertical-align: top;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}

	.food .rating-wrapper .rating-item .user .avatar {
		width: 24rpx;
		height: 24rpx;
		border-radius: 50%;
	}

	.food .rating-wrapper .rating-item .time {
		margin-bottom: 12rpx;
		line-height: 24rpx;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}

	.food .rating-wrapper .rating-item .text {
		line-height: 32rpx;
		font-size: 24rpx;
		color: rgb(7, 17, 27);
	}

	.food .rating-wrapper .rating-item .text .icon-thumb_down,
	.icon-thumb_up {
		margin-right: 8rpx;
		line-height: 32rpx;
		font-size: 24rpx;
	}

	.food .rating-wrapper .rating-item .text .icon-thumb_up {
		color: rgb(0, 160, 220);
	}

	.food .rating-wrapper .rating-item .text .icon-thumb_down {
		color: rgb(147, 153, 159);
	}

	.food .rating-wrapper .no-rating {
		padding: 32rpx 0;
		font-size: 24rpx;
		color: rgb(147, 153, 159);
	}
</style>
