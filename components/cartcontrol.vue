<template>
	<view class="cartcontrol">
		<view class="animation">
			<view class="cart-decrease" v-show="food.count > 0" @tap.stop="decreaseCart" :animation="moveAnimationData">
				<text class="inner icon icon-remove_circle_outline" :animation="innerAnimationData"></text>
			</view>
		</view>
		<view class="cart-count" v-show="food.count>0">{{food.count}}</view>
		<view class="cart-add icon icon-add_circle" @tap.stop="addCart"></view>
	</view>
</template>

<script>
	export default {
		// props: {
		// 	food: {
		// 		type: Object
		// 	}
		// },
		data() {
			return {
				food: {
					count: 0,
				},
				innerAnimationData: {},
				moveAnimationData: {}
			};
		},
		methods: {
			addCart(event) {
					this.enter()
				// if (!event._constructed) {
				// 	return;
				// }
				// if (!this.food.count) {
				// 	Vue.set(this.food, 'count', 1);
				// } else {
				// 	this.food.count++;
				// }
				// 点击添加购物车，会出发添加动画
				this.food.count++
				// this.$emit('add', event.target);
			},
			decreaseCart(event) {
				// if (!event._constructed) {
				// 	return;
				// }
				if(this.food.count <= 1)
				this.leave()
				if (this.food.count) {
					this.food.count--;
				}

			},
			enter() {
				let move = uni.createAnimation({
					duration: 400,
					timingFunction: 'linear'
				})
				let inner = uni.createAnimation({
					duration: 400,
					timingFunction: 'linear'
				})
				inner.rotate(180).step()
				move.opacity(1).translate3d(0, 0, 0).step()

				this.$nextTick(function() {
					this.innerAnimationData = inner.export()
					this.moveAnimationData = move.export()
				})
			},
			leave() {
				let move = uni.createAnimation({
					duration: 400,
					timingFunction: 'linear',
					delay: 0
				})
				let inner = uni.createAnimation({
					duration: 400,
					timingFunction: 'linear',
					delay: 0
				})
				inner.rotate(0).step()
				move.opacity(0).translate3d(24, 0, 0).step()
				this.$nextTick(function() {
					this.innerAnimationData = inner.export()
					this.moveAnimationData = move.export()
				})
			}
		}
	}
</script>

<style>
	.cartcontrol {
		font-size: 0;

	}

	.cartcontrol .animation {
		display: inline-block;
	}

	.cartcontrol .cart-decrease {
		display: inline-block;
		padding: 12rpx;
		opacity: 1;
		transform: translate3d(24px, 0, 0);
	}

	.cartcontrol .cart-decrease .inner {
		display: inline-block;
		line-height: 48rpx;
		font-size: 48rpx;
		color: rgb(0, 160, 220);
		transition: all 0.4s linear;
		transform: rotate(0);
	}

	/* 动画 */
	.cartcontrol .cart-count {
		display: inline-block;
		vertical-align: top;
		width: 24rpx;
		padding-top: 12rpx;
		line-height: 48rpx;
		font-size: 20rpx;
		text-align: center;
		color: rgb(147, 153, 159);
	}

	.cartcontrol .cart-add {
		display: inline-block;
		padding: 12rpx;
		line-height: 48rpx;
		font-size: 48rpx;
		color: rgb(0, 160, 220);
	}
</style>
