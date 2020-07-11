<template>
	<view class="header">
		<view class="content-wrapper">
			<view class="avatar">
				<image :src="seller.avatar" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="title">
					<text class="brand"></text>
					<text class="name">{{seller.name}}</text>
				</view>
				<view class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</view>
				<view class="support" v-if="seller.supports">
					<text class="icon" :class="classMap[seller.supports[0].type]"></text>
					<text class="text">{{seller.supports[0].description}}</text>
				</view>
			</view>
			<view class="support-count" v-if="seller.supports" @tap="showDetail">
				<text class="count">{{seller.supports.length}}个</text>
				<text class="icon icon-keyboard_arrow_right"></text>
			</view>
		</view>
		<view class="bulletin-wrapper" @tap="showDetail">
			<text class="bulletin-title"></text>
			<text class="bulletin-text">{{seller.bulletin}}</text>
			<text class="icon icon-keyboard_arrow_right"></text>
		</view>
		<view class="background">
			<image :src="seller.avatar" mode="scaleToFill"></image>
		</view>
		<view class="animation">
			<view class="detail" v-show="detailShow" :animation="animationData">
				<view class="detail-wrapper clearfix">
					<view class="detail-main">
						<text class="name">{{seller.name}}</text>
						<view class="star-wrapper">
							<!-- 评分组件 -->
							五星好评★★★★★
						</view>
						<view class="title">
							<view class="line"></view>
							<view class="text">优惠信息</view>
							<view class="line"></view>
						</view>
						<view class="supports" v-if="seller.supports">
							<view class="support-item" v-for="(item,index) in seller.supports" :key="index">
								<text class="icon" :class="classMap[seller.supports[index].type]"></text>
								<text class="text">{{seller.supports[index].description}}</text>
							</view>
						</view>
						<view class="title">
							<view class="line"></view>
							<view class="text">商家公告</view>
							<view class="line"></view>
						</view>
						<view class="bulletin">
							<text class="content">{{seller.bulletin}}</text>
						</view>
					</view>
				</view>
				<view class="detail-close" @tap="hideDetail">
					<text class="icon icon-close"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "myHeader",
		props: {
			seller: {
				type: Object,
				default: null
			}
		},
		data() {
			return {
				detailShow: false,
				animationData: {}
			};
		},
		created() {
			// console.log(this.seller.supports.length)
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		methods: {
			showDetail() {
				let animation = uni.createAnimation({
					delay: 0,
					duration: 500,
					timingFunction: 'linear'
				})
				animation.opacity(1)
					.backgroundColor("transprent")
					.step()
				this.animationData = animation.export()
				this.detailShow = true;
				// this.animationData = {}
			},
			hideDetail() {
				let animation = uni.createAnimation({
					delay: 0,
					duration: 500,
					timingFunction: 'linear'
				})
				animation.opacity(0)
					.backgroundColor("rgba(7,17,27,.8)")
					.step()
				this.animationData = animation.export()
				this.detailShow = false;

			}
		},
		onUnload() {
			this.animationData = {}
		}
	}
</script>

<style>
	.header {
		position: relative;
		overflow: hidden;
		color: #FFFFFF;
		width: 100%;
		height: 100%;
		background-color: rgba(7, 17, 27, .5);
	}

	.header .content-wrapper {
		position: relative;
		padding: 48rpx 24rpx 36rpx 48rpx;
		font-size: 0;
		z-index: 10;
	}

	.header .content-wrapper .avatar {
		display: inline-block;
		vertical-align: top;
		width: 128rpx;
		height: 128rpx;
	}

	.header .content-wrapper .avatar image {
		border-radius: 4rpx;
		height: 100%;
		width: 100%;
	}

	.header .content-wrapper .content {
		display: inline-block;
		margin-left: 32rpx;
	}

	.header .content-wrapper .content .title {
		margin: 4rpx 0 16rpx 0;
	}

	.header .content-wrapper .content .title .brand {
		display: inline-block;
		vertical-align: top;
		width: 60rpx;
		height: 36rpx;
		background-image: url(../../static/images/brand@3x.png);
		background-size: 60rpx 36rpx;
		background-repeat: no-repeat;
	}

	.header .content-wrapper .content .title .name {
		margin-left: 12rpx;
		font-size: 36rpx;
		line-height: 40rpx;
		font-weight: bold;
	}

	.header .content-wrapper .content .description {
		margin-bottom: 12rpx;
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.header .content-wrapper .content .support .icon {
		display: inline-block;
		vertical-align: top;
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		background-size: 24rpx 24rpx;
		background-repeat: no-repeat;
	}

	.header .content-wrapper .content .support .icon.decrease {
		background-image: url(../../static/images/decrease_2@3x.png);
	}

	.header .content-wrapper .content .support .icon.discount {
		background-image: url(../../static/images/discount_2@3x.png);
	}

	.header .content-wrapper .content .support .icon.guarantee {
		background-image: url(../../static/images/guarantee_2@3x.png);
	}

	.header .content-wrapper .content .support .icon.invoice {
		background-image: url(../../static/images/invoice_2@3x.png);
	}

	.header .content-wrapper .content .support .icon.special {
		background-image: url(../../static/images/special_2@3x.png);
	}

	.header .content-wrapper .content .support .text {
		line-height: 24rpx;
		font-size: 20rpx;
	}

	.header .content-wrapper .support-count {
		position: absolute;
		right: 24rpx;
		bottom: 28rpx;
		padding: 0 16rpx;
		height: 48rpx;
		line-height: 48rpx;
		border-radius: 28rpx;
		background-color: rgba(0, 0, 0, .2);
		text-align: center;
	}

	.header .content-wrapper .support-count .count {
		vertical-align: top;
		font-size: 20rpx;
	}

	.header .content-wrapper .support-count .icon-keyboard_arrow_right {
		margin-left: 4rpx;
		line-height: 48rpx;
		font-size: 20rpx;
	}

	.header .bulletin-wrapper {
		position: relative;
		height: 58rpx;
		line-height: 58rpx;
		padding: 0 44rpx 0 24rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background-color: rgba(7, 17, 27, .2);
		z-index: 10;
	}

	.header .bulletin-wrapper .bulletin-title {
		display: inline-block;
		vertical-align: top;
		margin-top: 16rpx;
		width: 44rpx;
		height: 24rpx;
		background-image: url(../../static/images/bulletin@3x.png);
		background-size: 44rpx 24rpx;
		background-repeat: no-repeat;
	}

	.header .bulletin-wrapper .bulletin-text {
		vertical-align: top;
		margin: 0 8rpx;
		font-size: 20rpx;
	}

	.header .bulletin-wrapper .icon-keyboard_arrow_right {
		position: absolute;
		font-size: 20rpx;
		right: 24rpx;
		top: 16rpx;
	}

	.header .background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		filter: blur(10px);
	}

	.header .background::before {
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(7, 17, 27, .5);
		z-index: 2;
	}

	.header .background image {
		width: 100%;
		height: 100%;
	}

	/* .header  .content .bulletin-wrapper .background .animation{
		width: 100vw;
		height: 100vh;
	} */
	.header .detail {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		backdrop-filter: blur(10px);
		opacity: 0;
		background-color: rgba(7, 17, 27, .8);
	}

	.header .detail .detail-wrapper {
		width: 100%;
		min-height: calc(100%-88rpx);
	}

	.header .detail .detail-wrapper .detail-main {
		margin-top: 128rpx;
		padding-bottom: 128rpx;
	}

	.header .detail .detail-wrapper .detail-main .name {
		display: block;
		text-align: center;
		line-height: 32rpx;
		font-size: 32rpx;
		font-weight: 700;
	}

	.header .detail .detail-wrapper .detail-main .star-wrapper {
		margin-top: 36rpx;
		padding: 4rpx 0;
		text-align: center;
	}

	.header .detail .detail-wrapper .detail-main .title {
		display: flex;
		width: 80%;
		margin: 56rpx auto 48rpx auto;
	}

	.header .detail .detail-wrapper .detail-main .title .line {
		flex: 1;
		position: relative;
		top: -12rpx;
		border-bottom: 2rpx solid rgba(255, 255, 255, .2);
	}

	.header .detail .detail-wrapper .detail-main .title .text {
		padding: 0 24rpx;
		font-weight: 700;
		font-size: 28rpx;
	}

	.header .detail .detail-wrapper .detail-main .supports {
		width: 80%;
		margin: 0 auto;
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item {
		padding: 0 24rpx;
		margin-bottom: 24rpx;
		font-size: 0;
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item:last-child {
		margin-bottom: 0;
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item .icon {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		vertical-align: top;
		margin-right: 12rpx;
		background-size: 32rpx 32rpx;
		background-repeat: no-repeat;
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item .icon.decrease {
		background-image: url(../../static/images/decrease_2@3x.png);
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item .icon.discount {
		background-image: url(../../static/images/discount_2@3x.png);
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item .icon.guarantee {
		background-image: url(../../static/images/guarantee_2@3x.png);
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item .icon.invoice {
		background-image: url(../../static/images/invoice_2@3x.png);
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item .icon.special {
		background-image: url(../../static/images/special_2@3x.png);
	}

	.header .detail .detail-wrapper .detail-main .supports .support-item .text {
		line-height: 32rpx;
		font-size: 24rpx;
	}

	.header .detail .detail-wrapper .detail-main .bulletin {
		width: 80%;
		margin: 0 auto;
	}

	.header .detail .detail-wrapper .detail-main .bulletin .content {
		padding: 0 24rpx;
		line-height: 48rpx;
		font-size: 24rpx;
	}

	.header .detail .detail-close {
		position: relative;
		width: 64rpx;
		height: 64rpx;
		margin: -64rpx auto 0 auto;
		clear: both;
		font-size: 64rpx;
	}
</style>
