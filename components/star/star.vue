<template>
	<view class="star" :class="starType">
		<text class="star-item" v-for="(itemClass,index) in itemClasses" :class="itemClass" :key="index"></text>
	</view>
</template>

<script>
	const LENGTH = 5
	const CLS_ON = 'on'
	const CLS_HALF = 'half'
	const CLS_OFF = 'off'

	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size;
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score * 2) / 2;
				let hasDecimal = score % 1 !== 0;
				let integer = Math.floor(score);
				for (let i = 0; i < integer; i++) {
					result.push(CLS_ON);
				}
				if (hasDecimal) {
					result.push(CLS_HALF);
				}
				while (result.length < LENGTH) {
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>

<style>
	.star {
		font-size: 0;
	}

	.star .star-item {
		display: inline-block;
		background-repeat: no-repeat;
	}

	.star.star-48 .star-item {
		width: 40rpx;
		height: 40rpx;
		margin-right: 44rpx;
		background-size: 40rpx 40rpx;
	}

	.star.star-48 .star-item:last-child {
		margin-right: 0;
	}

	.star.star-48 .star-item.on {
		background-image: url(../../static/images/star48_on@3x.png);
	}

	.star.star-48 .star-item.half {
		background-image: url(../../static/images/star48_half@3x.png);
	}

	.star.star-48 .star-item.off {
		background-image: url(../../static/images/star48_off@3x.png);
	}

	.star.star-36 .star-item {
		width: 30rpx;
		height: 30rpx;
		margin-right: 12rpx;
		background-size: 30rpx 30rpx;
	}

	.star.star-36 .star-item:last-child {
		margin-right: 0;
	}

	.star.star-36 .star-item.on {
		background-image: url(../../static/images/star36_on@3x.png);
	}

	.star.star-36 .star-item.half {
		background-image: url(../../static/images/star36_half@3x.png);
	}

	.star.star-36 .star-item.off {
		background-image: url(../../static/images/star36_off@3x.png);
	}

	.star.star-24 .star-item {
		width: 20rpx;
		height: 20rpx;
		margin-right: 6rpx;
		background-size: 20rpx 20rpx;
	}

	.star.star-24 .star-item:last-child {
		margin-right: 0;
	}

	.star.star-24 .star-item.on {
		background-image: url(../../static/images/star24_on@3x.png);
	}

	.star.star-24 .star-item.half {
		background-image: url(../../static/images/star24_half@3x.png);
	}

	.star.star-24 .star-item.off {
		background-image: url(../../static/images/star24_off@3x.png);
	}
</style>
