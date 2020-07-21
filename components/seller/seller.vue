<template>
	<scroll-view class="seller" scroll-y="true">
		<view class="seller-content">
			<view class="overview">
				<text class="title">{{seller.name}}</text>
				<view class="desc">
					<view class="stars">
						<star :size="36" :score="seller.score"></star>
					</view>
					<text class="text">{{seller.ratingCount}}</text>
					<text class="text">月售{{seller.sellCount}}单</text>
				</view>
				<view class="remark">
					<view class="block">
						<text class="h2">起送价</text>
						<view class="content">
							<text class="stress">{{seller.minPrice}}</text>元
						</view>
					</view>
					<view class="block">
						<text class="h2">商家配送</text>
						<view class="content">
							<text class="stress">{{seller.deliveryPrice}}</text>元
						</view>
					</view>
					<view class="block">
						<text class="h2">平均配送时间</text>
						<view class="content">
							<text class="stress">{{seller.deliveryTime}}</text>分钟
						</view>
					</view>
				</view>
				<view class="favorite" @tap="toggleFavorite">
					<text class="icon icon-favorite" :class="{'active':favorite}"></text>
					<text class="text">{{favoriteText}}</text>
				</view>
			</view>
			<split></split>
			<view class="bulletin">
				<text class="title">公告与活动</text>
				<view class="content-wrapper">
					<text class="content">{{seller.bulletin}}</text>
				</view>
				<view class="supports">
					<view class="support-item" v-for="(item,index) in seller.supports">
						<text class="icon" :class="classMap[seller.supports[index].type]"></text>
						<text class="text">{{seller.supports[index].description}}</text>
					</view>
				</view>
			</view>
			<split></split>
			<view class="pics">
				<text class="title">商家实景</text>
				<view class="pic-wrapper">
					<scroll-view class="pic-list" scroll-x="true">
						<view class="pic-item" v-for="(pic,index) in seller.pics" @tap="preview(index)">
							<image :src="pic" mode="scaleToFill"></image>
						</view>
					</scroll-view>
				</view>
			</view>
			<split></split>
			<view class="info">
				<text class="title">商家信息</text>
				<view class="info-item" v-for="info in seller.infos">
					{{info}}
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {
		saveToLocal,
		loadFromLocal
	} from '../../util/store.js'
	import split from '../split/split.vue'
	import star from '../star/star.vue'
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false);
				})()
			};
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		methods: {
			toggleFavorite() {
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			},
			preview(cur){
				uni.previewImage({
					current:cur,
					urls:this.seller.pics,
					indicator:'default',
				})
				// console.log(cur)
			}
		},
		watch: {

		},
		components: {
			"split": split,
			"star": star
		}
	}
</script>

<style>
	.seller {
		position: absolute;
		/* top: 308rpx; */
		top: 344rpx;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}

	.seller .overview {
		position: relative;
		padding: 36rpx;
		/* padding-top: 72rpx; */
	}

	.seller .overview .title {
		margin-bottom: 16rpx;
		line-height: 28rpx;
		color: rgb(7, 17, 27);
		font-size: 28rpx;
		display: inline-block;
	}

	.seller .overview .desc {
		padding-bottom: 36rpx;
		font-size: 0;
		position: relative;
	}

	.seller .overview .desc::after {
		position: absolute;
		content: '';
		display: block;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.seller .overview .desc .stars {
		display: inline-block;
		margin-right: 16rpx;
		vertical-align: top;
	}

	.seller .overview .desc .text {
		display: inline-block;
		margin-right: 24rpx;
		line-height: 36rpx;
		vertical-align: top;
		font-size: 20rpx;
		color: rgb(77, 85, 93);
	}

	.seller .overview .remark {
		display: flex;
		padding-top: 36rpx;
	}

	.seller .overview .remark .block {
		flex: 1;
		text-align: center;
		border-right: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.seller .overview .remark .block:last-child {
		border: none;
	}

	.seller .overview .remark .block .h2 {
		margin-bottom: 8rpx;
		line-height: 20rpx;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
		display: inline-block;
	}

	.seller .overview .remark .block .content {
		line-height: 48rpx;
		font-size: 20rpx;
		color: rgb(7, 17, 27);
	}

	.seller .overview .remark .block .content .stress {
		font-size: 48rpx;
	}

	.seller .overview .favorite {
		position: absolute;
		width: 100rpx;
		right: 22rpx;
		top: 36rpx;
		text-align: center;
	}

	.seller .overview .favorite .icon-favorite {
		display: block;
		margin-bottom: 8rpx;
		line-height: 48rpx;
		font-size: 48rpx;
		color: #d4d6d9;
	}

	.seller .overview .favorite .icon-favorite.active {
		color: rgb(240, 20, 20);
	}

	.seller .overview .favorite .icon-favorite .text {
		line-height: 20rpx;
		font-size: 20rpx;
		color: rgb(77, 85, 93);
	}

	.seller .bulletin {
		padding: 36rpx 36rpx 0 36rpx;
	}

	.seller .bulletin .title {
		margin-bottom: 16rpx;
		line-height: 28rpx;
		font-size: 28rpx;
		color: rgb(7, 17, 27);
		display: inline-block;
	}

	.seller .bulletin .content-wrapper {
		padding: 0 24rpx 32rpx 24rpx;
		position: relative;
	}

	.seller .bulletin .content-wrapper::after {
		position: absolute;
		content: '';
		display: block;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.seller .bulletin .content-wrapper .content {
		line-height: 48rpx;
		font-size: 24rpx;
		color: rgb(240, 20, 20);
	}

	.seller .bulletin .supports .support-item {
		padding: 32rpx 24rpx;
		font-size: 0;
		position: relative;
	}

	.seller .bulletin .supports .support-item::after {
		position: absolute;
		content: '';
		left: 0;
		bottom: 0;
		display: block;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.seller .bulletin .supports .support-item::after:last-child {
		border: none;
	}

	.seller .bulletin .supports .support-item .icon {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		vertical-align: top;
		margin-right: 12rpx;
		background-size: 32rpx 32rpx;
		background-repeat: no-repeat;
	}

	.seller .bulletin .supports .support-item .icon.decrease {
		background-image: url(../../static/images/decrease_2@3x.png);
	}

	.seller .bulletin .supports .support-item .icon.discount {
		background-image: url(../../static/images/discount_2@3x.png);
	}

	.seller .bulletin .supports .support-item .icon.guarantee {
		background-image: url(../../static/images/guarantee_2@3x.png);
	}

	.seller .bulletin .supports .support-item .icon.invoice {
		background-image: url(../../static/images/invoice_2@3x.png);
	}

	.seller .bulletin .supports .support-item .icon.special {
		background-image: url(../../static/images/special_2@3x.png);
	}

	.seller .bulletin .supports .support-item .text {
		line-height: 32rpx;
		font-size: 24rpx;
		color: rgb(7, 17, 27);
	}

	.seller .pics {
		padding: 36rpx;
	}

	.seller .pics .title {
		margin-bottom: 24rpx;
		line-height: 28rpx;
		font-size: 28rpx;
		color: rgb(7, 17, 27);
		display: inline-block;
	}

	.seller .pics .pic-wrapper {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	.seller .pics .pic-wrapper .pic-list {
		font-size: 0;
	}

	.seller .pics .pic-wrapper .pic-list .pic-item {
		display: inline-block;
		margin-right: 12rpx;
		width: 240rpx;
		height: 180rpx;
	}

	.seller .pics .pic-wrapper .pic-list .pic-item image {
		width: 100%;
		height: 100% !important;
	}

	.seller .pics .pic-wrapper .pic-list .pic-item:last-child {
		margin: 0;
	}

	.seller .info {
		padding: 36rpx 36rpx 0 36rpx;
		color: rgb(7, 17, 27);
	}

	.seller .info .title {
		padding-bottom: 24rpx;
		line-height: 28rpx;
		font-size: 28rpx;
		position: relative;
		display: inline-block;
	}

	.seller .info .title::after {
		position: absolute;
		content: '';
		display: block;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.seller .info .info-item {
		padding: 32rpx 24rpx;
		line-height: 32rpx;
		font-size: 24rpx;
		position: relative;
	}

	.seller .info .info-item::after {
		position: absolute;
		content: '';
		display: block;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.seller .info .info-item::after:last-child {
		border: none;
	}
</style>
