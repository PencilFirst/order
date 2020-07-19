<template>
	<view>
		<view class="shopcart">
			<view class="content" @tap="toggleList">
				<view class="content-left">
					<view class="logo-wrapper">
						<view class="logo" :class="{'highlight':totalCount>0}">
							<text class="icon icon-shopping_cart" :class="{'highlight':totalCount>0}"></text>
						</view>
						<view class="num" v-show="totalCount>0">
							{{totalCount}}
						</view>
					</view>
					<view class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</view>
					<view class="desc">另需配送费￥{{deliveryPrice}}元</view>
				</view>
				<view class="content-right" @tap.stop="pay">
					<view class="pay" :class="payClass">
						{{payDesc}}
					</view>
				</view>
			</view>
			<view class="ball-container">
				<view class="animation" v-for="(ball,index) in balls" :key="index">
					<view class="ball" v-show="ball.show" ref="inner">
						<view class="inner inner-hook"></view>
					</view>
				</view>
			</view>
			<view class="animation">
				<view class="shopcart-list" v-show="listShow" :animation="toggleAnimationData">
					<view class="list-header">
						<text class="title">购物车</text>
						<text class="empty" @tap="empty">清空</text>
					</view>
					<scroll-view class="list-content" id="listContent" scroll-y="true">
						<view class="food" v-for="(food,index) in selectFoods" :key="index">
							<text class="name">{{food.name}}</text>
							<view class="price">
								<text>￥{{food.price * food.count}}</text>
							</view>
							<view class="cartcontrol-wrapper">
								<cartcontrol :food="food" @add="addFood"></cartcontrol>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

		</view>
		<view class="animation">
			<view class="list-mask" v-show="listShow" @tap="hideList"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import cartControl from '../cartcontrol/cartcontrol.vue'
	export default {
		props: {
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
			selectFoods: {
				type: Array
			}
		},
		data() {
			return {
				fold: true,
				toggleAnimationData: {},
				dropBalls: [],
				balls: [{
					show: false
				}, {
					show: false
				}, {
					show: false
				}, {
					show: false
				}, {
					show: false
				}, ]
			};
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				} else {
					return '去结算';
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			},
			listShow() {
				if (!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				// if (show) {
				//   this.$nextTick(() => {
				//     if (!this.scroll) {
				//       this.scroll = new BScroll(this.$refs.listContent, {
				//         click: true
				//       });
				//     } else {
				//       this.scroll.refresh();
				//     }
				//   });
				// }
				return show;
			}
		},
		methods: {
			...mapMutations(['putOrder']),
			toggleList() {
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
			},
			// 结账方法
			pay() {
				const _this = this
				if (this.totalPrice < this.minPrice) {
					return;
				}
				// window.alert(`支付${this.totalPrice}元`);
				uni.showModal({
					title: '提交订单',
					content: '确认是否下单',
					success(res) {
						if (res.confirm) {

							const goodItem = []
							_this.selectFoods.forEach((food) => {
								const item = Object.assign({}, {
									name: food.name,
									price: food.price,
									count: food.count
								})
								goodItem.push(item)
							})
							console.log(goodItem)
							const orderList = {
								orderNumber: new Date().getTime(),
								status: 0,
								totalPrice: _this.totalPrice,
								totalCount: _this.totalCount,
								orderItem: goodItem
							}
							_this.putOrder(orderList)
							_this.empty()
							uni.showToast({
								title: '下单成功',
								icon: 'success',
								position: 'center',
								duration: 1500
							})
						} else if (res.cancel) {
							uni.showToast({
								title: '已取消',
								icon: 'none',
								position: 'center',
								duration: 1500
							})
						}
					},
					fail() {

					}
				})

				// console.log(new Date().getTime())
				// {
				// 	orderNumber:new Date().getTime(),
				// 	status:0,
				// 	totalPrice:this.totalPrice,
				// 	orderItem:[]
				// }

				// {
				//  单号: new Date().getTime(),
				// 	订单状态: 0 ,
				// 	订单总价格: this.totalPrice,
				// 	订单详情: goodItem

				// 一共多少东西：totalCount
				// }
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
			},
			hideList() {
				this.fold = true;
			},
			leave() {
				let leave = uni.createAnimation()
				leave.translate3d(0, -247, 0).step({
					duration: 0
				}).step()
				leave.translate3d(0, 0, 0).step({
					duration: 500
				})
				this.toggleAnimationData = leave.export()
			},
			enter() {
				const HEIGHT = 48
				let cout = this.selectFoods.length
				let offset = HEIGHT * cout + 40 > 247 ? 247 : HEIGHT * cout + 40
				let toggle = uni.createAnimation()
				toggle.translate3d(0, 0, 0).step({
					duration: 0
				})
				toggle.translate3d(0, -offset, 0).step({
					duration: 500
				})

				this.toggleAnimationData = toggle.export()
			},
			beforeDrop(el) {
				let count = this.balls.length
				while (count--) {
					let ball = this.balls[count]
					if (ball.show) {
						let rect = ball.el
						// .getBoundingClientRect()
						// console.log(rect)
						let x = rect.x - 64
						let y = -(window.innerHeight - rect.y - 84)
						// console.log(rect.x)
						el.style.display = ''
						el.style.webkitTransform = `translate3d(0,${y}px,0)`
						el.style.transform = `translate3d(0,${y}px,0)`
						let inner = el.getElementsByClassName('inner-hook')[0]
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`
						inner.style.transform = `translate3d(${x}px,0,0)`
						console.log(el.style)
					}
				}
			},
			addFood(target) {
				// console.log(this.$refs.inner[0].$el)
				const el = this.$refs.inner[0].$el
				// this.drop(target);
				// this.beforeDrop(el)
				// this.dropping(el, this.afterDrop(el))
				// this.afterDrop()
			},
			drop(el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						// console.log('111')
						return;
					}
				}
			},
			dropping(el, done) {
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight;
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					el.addEventListener('transitionend', done);
				});
			},
			afterDrop(el) {
				let ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;
					// el.style.display = 'none';
				}
			}
		},
		watch: {
			fold(old, cur) {
				if (cur) {
					this.enter()
				} else {
					this.leave()
				}
			},
			selectFoods(old, cur) {
				console.log(old, cur)
				if (old.length < cur.length) {
					const HEIGHT = 48
					let cout = this.selectFoods.length
					let offset = HEIGHT * cout + 40 > 247 ? 247 : HEIGHT * cout + 40
					let toggle = uni.createAnimation()
					toggle.translate3d(0, -offset, 0).step({
						duration: 0
					})
					this.toggleAnimationData = toggle.export()
				}
			}
		},
		components: {
			"cartcontrol": cartControl
		}
	}
</script>

<style>
	.shopcart {
		position: fixed;
		bottom: 90rpx;
		left: 0;
		z-index: 50;
		width: 100%;
		height: 96rpx;
		/* background-color: #007AFF; */
	}

	.shopcart .content {
		display: flex;
		background-color: #141d27;
		font-size: 0;
		color: rgba(255, 255, 255, .4);
	}

	.shopcart .content .content-left {
		flex: 1;
	}

	.shopcart .content .content-left .logo-wrapper {
		display: inline-block;
		vertical-align: top;
		position: relative;
		top: -20rpx;
		margin: 0 24rpx;
		padding: 12rpx;
		width: 112rpx;
		height: 112rpx;
		box-sizing: border-box;
		border-radius: 50%;
		background-color: #141d27;
	}

	.shopcart .content .content-left .logo-wrapper .logo {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		text-align: center;
		background-color: #2b343c;
	}

	.shopcart .content .content-left .logo-wrapper .logo.highlight {
		background-color: rgb(0, 160, 220);
	}

	.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {
		line-height: 88rpx;
		font-size: 48rpx;
		color: #80858a;
	}

	.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart.highlight {
		color: #FFFFFF;
	}

	.shopcart .content .content-left .logo-wrapper .num {
		position: absolute;
		top: 0;
		right: 0;
		width: 48rpx;
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		border-radius: 32rpx;
		font-size: 18rpx;
		font-size: 700;
		color: #fff;
		background-color: rgb(240, 20, 20);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
	}

	.shopcart .content .content-left .price {
		display: inline-block;
		vertical-align: top;
		margin-top: 24rpx;
		line-height: 48rpx;
		padding-right: 24rpx;
		box-sizing: border-box;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 32rpx;
		font-weight: 700;
	}

	.shopcart .content .content-left .price.highlight {
		color: #FFFFFF;
	}

	.shopcart .content .content-left .desc {
		display: inline-block;
		vertical-align: top;
		margin: 24rpx 0 0 24rpx;
		line-height: 48rpx;
		font-size: 20rpx;
	}

	.shopcart .content .content-right {
		flex: 0 0 210rpx;
		width: 210rpx;
	}

	.shopcart .content .content-right .pay {
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: 700;
	}

	.shopcart .content .content-right .pay.not-enough {
		background-color: #2b333b;
	}

	.shopcart .content .content-right .pay.enough {
		background-color: #00b43c;
		color: #FFFFFF;
	}

	.shopcart .ball-container .ball {
		position: fixed;
		left: 64rpx;
		/* bottom: 44rpx; */
		bottom: 134rpx;
		z-index: 200;
		transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}

	.shopcart .ball-container .ball .inner {
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		background-color: rgb(0, 160, 220);
		transition: all 0.4s linear;
	}

	.shopcart .shopcart-list {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		/* transform: translate3d(0, -100%, 0); */
		transform: translate3d(0, 0, 0);
	}

	/* 动画 */
	.shopcart .shopcart-list .list-header {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 36rpx;
		background-color: #f3f5f7;
		border-bottom: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.shopcart .shopcart-list .list-header .title {
		float: left;
		font-size: 28rpx;
		color: rgb(7, 17, 27);
	}

	.shopcart .shopcart-list .list-header .empty {
		float: right;
		font-size: 24rpx;
		color: rgb(0, 160, 220);
	}

	.shopcart .shopcart-list .list-content {
		padding: 0 36rpx;
		max-height: 434rpx;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.shopcart .shopcart-list .list-content .food {
		position: relative;
		padding: 24rpx 0;
		box-sizing: border-box;
	}

	.shopcart .shopcart-list .list-content .food::after {
		position: absolute;
		content: '';
		display: block;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, .1);
	}

	.shopcart .shopcart-list .list-content .food .name {
		line-height: 48rpx;
		font-size: 28rpx;
		color: rgb(7, 17, 27);
	}

	.shopcart .shopcart-list .list-content .food .price {
		position: absolute;
		right: 180rpx;
		bottom: 24rpx;
		line-height: 48rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: rgb(240, 20, 20);
	}

	.shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
		position: absolute;
		right: 0;
		bottom: 12rpx;
	}

	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		backdrop-filter: blur(10px);
		opacity: 1;
		background-color: rgba(7, 17, 27, .6);
	}

	/* 动画 */
</style>
