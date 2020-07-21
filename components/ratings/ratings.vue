<template>
	<scroll-view class="ratings" scroll-y="true">
		<view class="ratings-content">
			<view class="overview">
				<view class="overview-left">
					<text class="score">{{seller.score}}</text>
					<view class="title">综合评分</view>
					<view class="rank">高于周边商家{{seller.rankRate}}%</view>
				</view>
				<view class="overview-right">
					<view class="score-wrapper">
						<text class="title">服务态度</text>
						<view class="stars">
							<star :size="36" :score="seller.serviceScore"></star>
						</view>
						<text class="score">{{seller.serviceScore}}</text>
					</view>
					<view class="score-wrapper">
						<text class="title">商品评分</text>
						<view class="stars">
							<star :size="36" :score="seller.foodScore"></star>
						</view>
						<text class="score">{{seller.foodScore}}</text>
					</view>
					<view class="delivery-wrapper">
						<text class="title">送达时间</text>
						<text class="delivery">{{seller.deliveryTime}}分钟</text>
					</view>
				</view>
			</view>
			<split></split>
			<ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings" @select="selectRating" @toggle="toggleContent"></ratingselect>
			<view class="rating-wrapper">
				<view class="rating-item" v-for="rating in ratings" v-if="needShow(rating.rateType, rating.text)">
					<view class="avatar">
						<image :src="rating.avatar" mode="widthFix"></image>
					</view>
					<view class="content">
						<text class="name">{{rating.username}}</text>
						<view class="star-wrapper">
							<view class="stars">
								<star :size="24" :score="rating.score"></star>
							</view>
							<text class="delivery" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</text>
						</view>
						<text class="text">{{rating.text}}</text>
						<view class="recommend" v-show="rating.recommend && rating.recommend.length">
							<text class="icon icon-thumb_up"></text>
							<text class="item" v-for="item in rating.recommend">{{item}}</text>
						</view>
						<view class="time">
							{{rating.rateTime | formatDate}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {
		formatDate
	} from '../../util/date.js'
	import star from '../star/star.vue'
	import ratingselect from '../ratingselect/ratingselect.vue'
	import split from '../split/split.vue'

	const ALL = 2;
	const ERR_OK = 0;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			};
		},
		created() {
			this.getRatingsInfo()
		},
		methods: {
			async getRatingsInfo() {
				// #ifdef H5	
				const res = await this.$http({
					url: '/api/ratings'
				})
				// #endif

				// #ifndef H5
				const res = await this.$http({
					url: '/ratings'
				})
				// #endif

				this.ratings = res.data.data
				console.log(res.data.data)
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
			selectRating(type) {
				this.selectType = type;
			},
			toggleContent() {
				this.onlyContent = !this.onlyContent;
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			"star": star,
			"ratingselect": ratingselect,
			"split": split
		}
	}
</script>

<style>
	.ratings {
		position: absolute;
		top: 348rpx;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}

	.ratings .overview {
		display: flex;
		padding: 36rpx 0;
	}

	.ratings .overview .overview-left {
		/* flex: 0 0 348rpx; */
		flex: 0 0 240rpx;
		padding: 12rpx 0;
		/* width: 348rpx; */
		width: 240rpx;
		border-right: 2rpx solid rgba(7, 17, 27, 0.1);
		text-align: center;
	}

	/*@ media only screen and (max-width:320px) {
		.ratings .overview
		.overview-left {
			flex: 0 0 240rpx;
			width: 240rpx;
		}
	} */

	.ratings .overview .overview-left .score {
		margin-bottom: 12rpx;
		line-height: 36rpx;
		font-size: 48rpx;
		color: rgb(255, 153, 0);
	}

	.ratings .overview .overview-left .title {
		margin-bottom: 16rpx;
		line-height: 24rpx;
		font-size: 24rpx;
		color: rgb(7, 17, 27);
	}

	.ratings .overview .overview-left .rank {
		line-height: 20rpx;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}

	.ratings .overview .overview-right {
		flex: 1;
		padding: 12rpx 0 12rpx 48rpx;
	}

	/* 
	 @media only screen and (max-width:320px) {
		.ratings .overview
		.overview-right{
			padding-left: 12rpx;
		}
	} */

	.ratings .overview .overview-right .score-wrapper {
		margin-bottom: 16rpx;
		font-size: 0;
		/* 	width: 100%;
		display: inline-block; */
	}

	.ratings .overview .overview-right .score-wrapper .title {
		display: inline-block;
		line-height: 36rpx;
		vertical-align: top;
		font-size: 24rpx;
		color: rgb(7, 17, 27);
	}

	.ratings .overview .overview-right .score-wrapper .stars {
		display: inline-block;
		vertical-align: top;
		margin: 0 24rpx;
		width: 50%;
	}

	.ratings .overview .overview-right .score-wrapper .score {
		display: inline-block;
		line-height: 36rpx;
		vertical-align: top;
		font-size: 24rpx;
		color: rgb(255, 153, 0);
	}

	.ratings .overview .overview-right .delivery-wrapper {
		font-size: 0;
	}

	.ratings .overview .overview-right .delivery-wrapper .title {
		line-height: 36rpx;
		font-size: 24rpx;
		color: rgb(7, 17, 27);
	}

	.ratings .overview .overview-right .delivery-wrapper .delivery {
		margin-left: 24rpx;
		font-size: 24rpx;
		color: rgb(147, 153, 159);
	}

	.ratings .rating-wrapper {
		padding: 0 36rpx;
	}

	.ratings .rating-wrapper .rating-item {
		position: relative;
		display: flex;
		padding: 36rpx 0;
	}

	.ratings .rating-wrapper .rating-item::after {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		content: '';
		display: block;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.ratings .rating-wrapper .rating-item .avatar {
		flex: 0 0 56rpx;
		width: 56rpx;
		margin-right: 24rpx;
	}

	.ratings .rating-wrapper .rating-item .avatar image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.ratings .rating-wrapper .rating-item .content {
		position: relative;
		flex: 1;
	}

	.ratings .rating-wrapper .rating-item .content .name {
		margin-bottom: 8rpx;
		line-height: 24rpx;
		font-size: 20rpx;
		color: rgb(7, 17, 27);
	}

	.ratings .rating-wrapper .rating-item .content .star-wrapper {
		margin-bottom: 32rpx;
		font-size: 0;
	}

	.ratings .rating-wrapper .rating-item .content .star-wrapper .stars {
		display: inline-block;
		margin-right: 12rpx;
		vertical-align: top;
		width: 130rpx;
	}

	.ratings .rating-wrapper .rating-item .content .star-wrapper .delivery {
		display: inline-block;
		vertical-align: top;
		line-height: 24rpx;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}

	.ratings .rating-wrapper .rating-item .content .text {
		margin-bottom: 16rpx;
		line-height: 36rpx;
		font-size: 24rpx;
		color: rgb(7, 17, 27);
	}

	.ratings .rating-wrapper .rating-item .content .recommend {
		line-height: 32rpx;
		font-size: 0;
	}

	.ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up,
	.item {
		display: inline-block;
		margin: 0 16rpx 8rpx 0;
		font-size: 18rpx;
	}

	.ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up {
		color: rgb(0, 160, 220);
	}

	.ratings .rating-wrapper .rating-item .content .recommend .item {
		padding: 0 12rpx;
		border: 2rpx solid rgba(7, 17, 27, 0.1);
		border-radius: 2rpx;
		color: rgb(147, 153, 159);
		background-color: #FFFFFF;
	}

	.ratings .rating-wrapper .rating-item .content .time {
		position: absolute;
		top: 0;
		right: 0;
		line-height: 24rpx;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}
</style>
