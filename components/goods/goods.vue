<template>
	<view>
		<view class="goods">
			<scroll-view class="menu-wrapper" id="menuWarpper" scroll-y="true" scroll-with-animation="true" :scroll-top="scrollTop">
				<view class="menu-item" v-for="(item,index) in goods" @tap="foodTo(index)" :key="index" :class="{'current':currentIndex === index}">
					<text class="text border-1px">
						<text class="icon" v-show="item.type>0" :class="classMap[item.type]"></text>
						{{item.name}}
					</text>
				</view>
			</scroll-view>
			<scroll-view class="foods-wrapper" id="foodsWrapper" scroll-y="true" scroll-with-animation="true" @scroll="foodScroll"
			 :scroll-top="foodTop">
				<view class="food-list" id="foodList" v-for="(item,index) in goods" :key="index">
					<text class="title" :id="'food'+index">{{item.name}}</text>
					<view class="food-item border-1px" v-for="(food,index) in item.foods" :key="index" @tap="selectFood(food)">
						<view class="icon">
							<image :src="food.icon" mode="widthFix"></image>
						</view>
						<view class="content">
							<text class="name">{{food.name}}</text>
							<view class="desc">{{food.description}}</view>
							<view class="extra">
								<text class="count">月售{{food.sellCount}}份</text>
								<text>好评率{{food.rating}}%</text>
							</view>
							<view class="price">
								<text class="now">￥{{food.price}}</text>
								<text class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</text>
							</view>
							<view class="cartcontrol-wrapper">
								<!-- 购物车控件组件 -->
								<cartcontrol :food="food"></cartcontrol>
								<!-- 购物车控件 -->
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- shopcart组件 -->
			<shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>
		</view>
		<!-- food组件 -->
		<food :food="selectedFood" ref="food"></food>
	</view>
</template>

<script>
	import cartControl from '../cartcontrol/cartcontrol.vue'
	import shopCart from '../shopcart/shopcart.vue'
	import food from '../food/food.vue'
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {},
				scrollTop: 0,
				foodTop: 0,
				height: []
			};
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.getGoodsInfo()

		},
		mounted() {


		},
		computed: {
			currentIndex() {
				const _this = this
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						// this._followScroll(i);
						// this.foodView = 'food' + i
						switch (i) {
							case 3:
								_this.scrollTop = 0
								break;
							case 4:
								_this.scrollTop = 200
								break;
						}
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			},
		},
		methods: {
			async getGoodsInfo() {
				const res = await this.$http({
					url: '/api/goods'
				})
				// console.log(res)
				this.goods = res.data.data
				this.$nextTick(() => {
					const query = uni.createSelectorQuery()
					query.selectAll('#foodList').boundingClientRect(data => {
						console.log(data[8])
						data.forEach(item => {
							this.height.push(Math.ceil(item.top))
						})
						this.height.forEach(item => {
							this.listHeight.push(item - this.height[0])
						})
						this.listHeight[this.goods.length] = this.height[this.goods.length - 1] + data[this.goods.length - 1].height
						console.log(res)
					}).exec()
				})
			},
			foodScroll(e) {
				// console.log(e)
				this.scrollY = e.detail.scrollTop
			},
			foodTo(index) {
				this.foodTop = this.listHeight[index] + 1
			},
			addFood(target) {
				// this._drop(target);
				console.log('11')
			},
			selectFood(food) {
				this.selectedFood = food;
				this.$refs.food.show();
			}
		},
		components: {
			"cartcontrol": cartControl,
			"shopcart": shopCart,
			"food": food
		}
	}
</script>

<style>
	.goods {
		display: flex;
		position: absolute;
		top: 350rpx;
		bottom: 90rpx;
		/* bottom: 0; */
		width: 100%;
		overflow: hidden;
	}

	.goods .menu-wrapper {
		flex: 0 0 160rpx;
		width: 160rpx;
		background-color: #f3f5f7;
		height: 100%;
	}

	.goods .menu-wrapper .menu-item {
		display: table;
		height: 108rpx;
		width: 160rpx;
		padding: 0 24rpx;
		line-height: 28rpx;
	}

	/* .goods .menu-wrapper .menu-item .text{
		width: 100%;
	} */

	.goods .menu-wrapper .menu-item.current {
		position: relative;
		z-index: 10;
		margin-top: -2rpx;
		background-color: #fff;
		font-weight: 700;
	}

	.goods .menu-wrapper .menu-item .text::after {
		/* display: none; */
	}

	.goods .menu-wrapper .menu-item .text .icon {
		display: inline-block;
		vertical-align: top;
		width: 24rpx;
		height: 24rpx;
		margin-right: 4rpx;
		background-size: 24rpx 24rpx;
		background-repeat: no-repeat;
	}

	/* .text??? */
	.goods .menu-wrapper .menu-item .text .icon.decrease {
		background-image: url(../../static/images/decrease_2@3x.png);
	}

	.goods .menu-wrapper .menu-item .text .icon.discount {
		background-image: url(../../static/images/discount_2@3x.png)
	}

	.goods .menu-wrapper .menu-item .text .icon.guarantee {
		background-image: url(../../static/images/guarantee_2@3x.png)
	}

	.goods .menu-wrapper .menu-item .text .icon.invoice {
		background-image: url(../../static/images/invoice_2@3x.png)
	}

	.goods .menu-wrapper .menu-item .text .icon.special {
		background-image: url(../../static/images/special_2@3x.png)
	}

	.goods .menu-wrapper .menu-item .text {
		display: table-cell;
		width: 112rpx;
		vertical-align: middle;
		position: relative;
		font-size: 24rpx;
	}

	.goods .menu-wrapper .menu-item .text::after {
		display: block;
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.goods .foods-wrapper {
		flex: 1;
		background-color: #fff;
	}

	.goods .foods-wrapper .title {
		padding-left: 24rpx;
		height: 52rpx;
		line-height: 52rpx;
		border-left: 4rpx solid #d9dde1;
		font-size: 24rpx;
		color: rgba(147, 153, 159);
		background-color: #f3f5f7;
		display: inline-block;
		width: 100%;
	}

	.goods .foods-wrapper .food-item {
		display: flex;
		margin: 36rpx;
		padding-bottom: 36rpx;
		position: relative;

	}

	.goods .foods-wrapper .food-item::after {
		display: block;
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid rgba(7, 17, 27, .1);
	}

	.goods .foods-wrapper .food-item:last-child {
		margin-bottom: 0;
	}

	.goods .foods-wrapper .food-item:last-child::after {
		display: none;
	}

	.goods .foods-wrapper .food-item .icon {
		flex: 0 0 114rpx;
		margin-right: 20rpx;
	}

	.goods .foods-wrapper .food-item .icon image {
		width: 114rpx;
		height: 114rpx;
	}

	.goods.goods .foods-wrapper .food-item .foods-wrapper .food-item .content {
		flex: 1;
	}

	.goods .foods-wrapper .food-item .content .name {
		margin: 4rpx 0 16rpx 0;
		height: 28rpx;
		height: 28rpx;
		line-height: 28rpx;
		font-size: 28rpx;
		color: rgb(7, 17, 27);
	}

	.goods .foods-wrapper .food-item .content .desc,
	.extra {
		line-height: 20rpx;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}

	.goods .foods-wrapper .food-item .content .desc {
		line-height: 24rpx;
		margin-bottom: 16rpx;
	}

	.goods .foods-wrapper .food-item .content .extra .count {
		margin-right: 24rpx;
	}

	.goods .foods-wrapper .food-item .content .price {
		font-weight: 700;
		line-height: 48rpx;
	}

	.goods .foods-wrapper .food-item .content .price .now {
		margin-right: 16rpx;
		font-size: 28rpx;
		color: rgb(240, 20, 20);
	}

	.goods .foods-wrapper .food-item .content .price .old {
		text-decoration: line-through;
		font-size: 20rpx;
		color: rgb(147, 153, 159);
	}

	.goods .cartcontrol-wrapper {
		position: absolute;
		right: 0;
		bottom: 24rpx;
	}
</style>
