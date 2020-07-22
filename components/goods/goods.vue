<template>
	<view>
		<view class="goods">
			<scroll-view class="menu-wrapper" id="menuWarpper" scroll-y="true" scroll-with-animation="true" :scroll-top="scrollTop">
				<view class="menu-item" v-for="(item,index) in goods" @tap="foodTo(index)" :key="index" :class="{'current':currentIndex === index}">
					<text class="text border-1px">
						<text class="icon" v-show="item.type>0" :class="'icon'+item.type"></text>
						{{item.name}}
					</text>
				</view>
			</scroll-view>
			<scroll-view class="foods-wrapper" id="foodsWrapper" scroll-y="true" scroll-with-animation="true" @scroll="foodScroll"
			 :scroll-top="foodTop">
				<view class="food-list" id="foodList" v-for="(item,index) in goods" :key="index">
					<text class="title" :id="'food'+index">{{item.name}}</text>
					<view class="food-item border-1px" v-for="(food,_index) in item.foods" :key="_index" @tap="selectFood(food,index,_index)">
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
								<cartcontrol :food="food" :index="_index" :first="index"></cartcontrol>
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
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
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
				// goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {},
				scrollTop: 0,
				foodTop: 0,
				height: [],
			};
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.getGoodsInfo()
		},
		mounted() {
			console.log(this.goods)
		},
		computed: {
			...mapState(['goods']),
			...mapGetters(['selectFoods']),
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
			// selectFoods() {
			// 	let foods = [];
			// 	this.goods.forEach((good, goodIndex) => {
			// 		good.foods.forEach((food, foodIndex) => {
			// 			if (food.count) {
			// 				foods.push(food);
			// 			}
			// 		});
			// 	});
			// 	return foods;
			// },
		},
		methods: {
			...mapMutations(['getGoods']),
			async getGoodsInfo() {

				//#ifdef H5
				const res = await this.$http({
					url: '/api/goods'
				})
				this.getGoods(res.data.data)
				//#endif
				//#ifndef H5
				// const res = await this.$http({
				// 	url: '/goods'
				// })
				const appData = require('../../util/data.json')
				this.getGoods(appData.goods)
				//#endif
				// console.log(res)
				// this.goods = res.data.data
				
				// console.log(this.goods)	
				const _this = this
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this)
					query.selectAll('#foodList').boundingClientRect(data => {
						data.forEach(item => {
							_this.height.push(Math.ceil(item.top))
						})

						this.height.forEach(item => {
							_this.listHeight.push(item - _this.height[0])
						})

						_this.listHeight[_this.goods.length] = _this.height[_this.goods.length - 1] + data[this.goods.length - 1].height

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
			selectFood(food, first, second) {
				food.payload = {
					first,
					second
				}
				this.selectedFood = food;
				this.$refs.food.show();
			},
			add(food, index, _index) {
				console.log(food, index, _index)
				this.$nextTick(function() {
					this.$set(this.goods[_index].foods, index, food)
				})
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
		align-items: center;
	}

	.goods .menu-wrapper .menu-item {
		display: table;
		height: 108rpx;
		width: 160rpx;
		padding: 0 14rpx;
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
	.goods .menu-wrapper .menu-item .text .icon.icon0 {
		background-image: url(../../static/images/decrease_2@3x.png);
	}

	.goods .menu-wrapper .menu-item .text .icon.icon1 {
		background-image: url(../../static/images/discount_2@3x.png)
	}

	.goods .menu-wrapper .menu-item .text .icon.icon2 {
		background-image: url(../../static/images/guarantee_2@3x.png)
	}

	.goods .menu-wrapper .menu-item .text .icon.icon3 {
		background-image: url(../../static/images/invoice_2@3x.png)
	}

	.goods .menu-wrapper .menu-item .text .icon.icon4 {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUFBMjcwRTY0REI0MTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUFBMjcwRTc0REI0MTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QUEyNzBFNDREQjQxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QUEyNzBFNTREQjQxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp/AcIcAAApRSURBVHja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');

		/* background-image: url(../../static/images/special_2@3x.png) */
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
