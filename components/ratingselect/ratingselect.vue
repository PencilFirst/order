<template>
	<view class="ratingselect">
		<view class="rating-type border-1px">
			<text class="block positive" :class="{'active':selectType===2}" @tap="select(2)">
				{{desc.all}}
				<text class="count">{{ratings.length}}</text>
			</text>
			<text class="block positive" :class="{'active':selectType===0}" @tap="select(0)">
				{{desc.positive}}
				<text class="count">{{positives.length}}</text>
			</text>
			<text class="block negative" :class="{'active':selectType===1}" @tap="select(1)">
				{{desc.negative}}
				<text class="count">{{negatives.length}}</text>
			</text>
		</view>
		<view class="switch" :class="{'on':onlyContent}" @tap="toggleContent">
			<text class="icon icon-check_circle"></text>
			<text class="text">只看有内容的评价</text>
		</view>
	</view>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			ratings: {
				type: Array,
				default () {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default () {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		},
		data() {
			return {

			};
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				});
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			}
		},
		methods: {
			select(type) {
				this.$emit('select', type);
			},
			toggleContent(){
				this.$emit('toggle');
			}
		}
	}
</script>

<style>
	.ratingselect .rating-type {
		padding: 36rpx 0;
		margin: 0 36rpx;
		position: relative;
		font-size: 0;
	}

	.ratingselect .rating-type::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.ratingselect .rating-type .block {
		display: inline-block;
		padding: 16rpx 24rpx;
		margin-right: 16rpx;
		line-height: 32rpx;
		border-radius: 2rpx;
		font-size: 24rpx;
		color: rgb(77, 85, 93);
	}

	.ratingselect .rating-type .block.active {
		color: #FFFFFF;
	}

	.ratingselect .rating-type .block .count {
		margin-left: 4rpx;
		font-size: 16rpx;
	}

	.ratingselect .rating-type .block.positive {
		background: rgba(0, 160, 220, 0.2);
	}

	.ratingselect .rating-type .block.positive.active {
		background: rgb(0, 160, 220)
	}

	.ratingselect .rating-type .block.negative {
		background: rgba(77, 85, 93, 0.2)
	}

	.ratingselect .rating-type .block.negative.active {
		background: rgb(77, 85, 93);
	}

	.ratingselect .switch {
		padding: 24rpx 36rpx;
		line-height: 48rpx;
		border-bottom: 2rpx solid rgba(7, 17, 27, 0.1);
		color: rgb(147, 153, 159);
		font-size: 0;
	}

	.ratingselect .switch.on .icon-check_circle {
		color: #00c850;
	}

	.ratingselect .switch .icon-check_circle {
		display: inline-block;
		vertical-align: top;
		margin-right: 8rpx;
		font-size: 48rpx;
	}

	.ratingselect .switch .text {
		display: inline-block;
		vertical-align: top;
		font-size: 24rpx;
	}
</style>
