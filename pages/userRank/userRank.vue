<template>
	<view class="user-rank">
		<view class="user-info">
			<view class="top">
				<image class="icon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk0OTgyODI1NDgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc3NzUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTM2Ljk2IDM4NS44NzczMzNsLTIwMy40MzQ2NjctMjA0LjgtMTguMDkwNjY3LTcuNjhMMzA4LjU2NTMzMyAxNzMuMzk3MzMzbC0xOC4wOTA2NjcgNy42OEw4Ny4wNCAzODUuODc3MzMzYy05LjcyOCA5Ljg5ODY2Ny05Ljg5ODY2NyAyNS45NDEzMzMtMC4xNzA2NjcgMzUuODRsNDA2Ljg2OTMzMyA0MjEuMDM0NjY3YzQuNzc4NjY3IDQuOTQ5MzMzIDExLjQzNDY2NyA3Ljg1MDY2NyAxOC40MzIgNy44NTA2NjcgNi45OTczMzMgMCAxMy42NTMzMzMtMi45MDEzMzMgMTguNDMyLTcuODUwNjY3bDQwNi44NjkzMzMtNDIxLjAzNDY2N0M5NDYuODU4NjY3IDQxMS42NDggOTQ2LjY4OCAzOTUuNzc2IDkzNi45NiAzODUuODc3MzMzek04NjguNTIyNjY3IDM4OS42MzJsLTE0MS45OTQ2NjcgMC0xNjMuODQtMTY1LjAzNDY2NyAxNDEuOTk0NjY3IDBMODY4LjUyMjY2NyAzODkuNjMyek0zMTkuMzE3MzMzIDIyNC43NjhsMTQzLjAxODY2NyAwLTE2My44NCAxNjUuMDM0NjY3TDE1NS40NzczMzMgMzg5LjgwMjY2NyAzMTkuMzE3MzMzIDIyNC43Njh6TTE3Ni40NjkzMzMgNDQwLjgzMmwxMzIuNjA4IDAgMTguMDkwNjY3LTcuNTA5MzMzIDE4NS4xNzMzMzMtMTg2LjUzODY2NyAxODUuMTczMzMzIDE4Ni41Mzg2NjcgMTguMDkwNjY3IDcuNTA5MzMzIDEzMS41ODQgMEw1MTIgNzg3Ljk2OCAxNzYuNDY5MzMzIDQ0MC44MzJ6IiBwLWlkPSI3Nzc2Ij48L3BhdGg+PC9zdmc+"
				 mode="widthFix"></image>
				<text class="title">青铜会员</text>
			</view>
			<view class="bottom">
				<text class="next-level">再消费200元可晋级白银会员</text>
				<view class="user-rights">
					<text class="title">我的权益</text>
					<view class="right" v-for="(item,index) in options[0].discounts">
						<text class="item">{{index+1 + '.'+item}}</text>
						<!-- <text class="item">会员立减</text> -->
						<!-- <text class="item">运费免单</text> -->
					</view>
				</view>
			</view>
		</view>
		<uni-steps :options="options" direction="column" activeColor="rgba(240,20,20,.8)" :active=0></uni-steps>
		<view class="rank-rule">
			<view class="title">
				等级规则
			</view>
			<view class="rules">
				<text>1.在小程序消费可增加等级经验;</text>
				<text>2.经验达到等级要求后，将会升级并自动获得等级奖励;</text>
				<text>3.每个周期结束后，系统将清除当前等级剩余经验;</text>
				<text>4.若已满足保留等级条件，则周期结束后等级不变;</text>
				<text>5.若不满足保留等级条件，则周期结束后将会降级。</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '../../components/uni-steps/uni-steps.vue'
	export default {
		data() {
			return {
				options: [{
						title: '青铜会员',
						desc: '',
						require: 0,
						discounts: ['送0会员积分', '生日特权', '会员立减']
					},
					{
						title: '白银会员',
						desc: '消费满200元',
						require: 200,
						coupon: ['送50会员积分', '满10减3优惠券3张', '生日特权', '会员立减']
					},
					{
						title: '黄金会员',
						desc: '消费满500元',
						require: 500,
						discounts: ['送80会员积分', '满15减6优惠券1张', '满20减8优惠券2张', '生日特权', '会员立减', '运费免单']
					},
					{
						title: '铂金会员',
						desc: '消费满800元',
						require: 800,
						discounts: ['送80会员积分', '满20减8优惠券2张', '满30减15优惠券2张', '生日特权', '会员立减', '运费免单']
					},
					{
						title: '钻石会员',
						desc: '消费满1000元',
						require: 1000,
						discounts: ['送100会员积分', '满20减8优惠券3张', '满30减15优惠券3张', '生日特权', '会员立减', '运费免单']
					}
				],
			}
		},
		methods: {

		},
		components: {
			"uni-steps": uniSteps
		}
	}
</script>

<style>
	.user-rank {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.user-info {
		border: 6rpx solid rgb(240, 20, 20);
		background-color: rgba(240, 20, 20, .1);
		border-radius: 20rpx;
		/* padding: 50rpx; */
		width: 94%;
		font-size: 28rpx;
		position: relative;
		margin-bottom: 30rpx;
	}

	.user-info .icon {
		width: 72rpx;
		height: 72rpx;
	}

	.user-info .top {
		display: flex;
		padding: 30rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid rgb(240, 20, 20);

	}

	.user-info .top .title {
		position: relative;
		right: -20rpx;
		/* color: #fff; */
		color: rgb(240, 20, 20, .9);
		font-weight: 600;
	}

	.user-info .top .title::after {
		position: absolute;
		content: '';
		display: block;
		top: -6rpx;
		left: -28rpx;
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
		background-color: rgba(7, 17, 27, .1);
		width: 150%;
		height: 150%;
		/* z-index: -1; */
	}

	.user-info .bottom {
		position: relative;
		padding: 30rpx;
	}

	.user-info .bottom .next-level {
		position: absolute;
		top: 0;
		right: 20rpx;
		color: rgba(240, 20, 20, .9);
		/* padding: 30rpx; */
	}

	.user-info .bottom .user-rights {
		font-size: 28rpx;
		line-height: 1.5;
	}

	.user-info .user-rights .title {
		font-size: 32rpx;
		font-weight: 600;
		margin-bottom: 14rpx;
		display: inline-block;
	}

	.user-info .right {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
	}

	.user-rank .rank-rule {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		font-size: 28rpx;
		line-height: 1.5;
		margin-top: 30rpx;
	}

	.user-rank .rank-rule .title {
		font-weight: 600;
		font-size: 32rpx;
		margin-bottom: 14rpx;
	}

	.user-rank .rules {
		display: flex;
		flex-direction: column;
	}
</style>
