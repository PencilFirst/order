<template>
	<view class="user">
		<view class="user-info">
			<view class="avatar">
				<image :src="accountInfo.url" mode="widthFix"></image>
			</view>
			<view class="username">
				{{accountInfo.username}}
			</view>
		</view>
		<view class="operate">
			<view class="item">
				<navigator url="../userRank/userRank" class="opt" hover-class="none">
					<image src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk0OTgyODI1NDgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc3NzUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTM2Ljk2IDM4NS44NzczMzNsLTIwMy40MzQ2NjctMjA0LjgtMTguMDkwNjY3LTcuNjhMMzA4LjU2NTMzMyAxNzMuMzk3MzMzbC0xOC4wOTA2NjcgNy42OEw4Ny4wNCAzODUuODc3MzMzYy05LjcyOCA5Ljg5ODY2Ny05Ljg5ODY2NyAyNS45NDEzMzMtMC4xNzA2NjcgMzUuODRsNDA2Ljg2OTMzMyA0MjEuMDM0NjY3YzQuNzc4NjY3IDQuOTQ5MzMzIDExLjQzNDY2NyA3Ljg1MDY2NyAxOC40MzIgNy44NTA2NjcgNi45OTczMzMgMCAxMy42NTMzMzMtMi45MDEzMzMgMTguNDMyLTcuODUwNjY3bDQwNi44NjkzMzMtNDIxLjAzNDY2N0M5NDYuODU4NjY3IDQxMS42NDggOTQ2LjY4OCAzOTUuNzc2IDkzNi45NiAzODUuODc3MzMzek04NjguNTIyNjY3IDM4OS42MzJsLTE0MS45OTQ2NjcgMC0xNjMuODQtMTY1LjAzNDY2NyAxNDEuOTk0NjY3IDBMODY4LjUyMjY2NyAzODkuNjMyek0zMTkuMzE3MzMzIDIyNC43NjhsMTQzLjAxODY2NyAwLTE2My44NCAxNjUuMDM0NjY3TDE1NS40NzczMzMgMzg5LjgwMjY2NyAzMTkuMzE3MzMzIDIyNC43Njh6TTE3Ni40NjkzMzMgNDQwLjgzMmwxMzIuNjA4IDAgMTguMDkwNjY3LTcuNTA5MzMzIDE4NS4xNzMzMzMtMTg2LjUzODY2NyAxODUuMTczMzMzIDE4Ni41Mzg2NjcgMTguMDkwNjY3IDcuNTA5MzMzIDEzMS41ODQgMEw1MTIgNzg3Ljk2OCAxNzYuNDY5MzMzIDQ0MC44MzJ6IiBwLWlkPSI3Nzc2Ij48L3BhdGg+PC9zdmc+"
					 mode="widthFix"></image>
					<text>会员等级</text>
				</navigator>
				<text class="icon icon-keyboard_arrow_right"></text>

			</view>
			<view class="item">
				<navigator url="../takeOrder/takeOrder" class="opt" hover-class="none">
					<image src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk0OTgyODIwMjgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc2NTMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjk4LjQ3MjcyNyAyNTAuMDE4OTA5QzMyNy4wMDUwOTEgMTA5Ljk4NjkwOSA0MDQuNzgyNTQ1IDM0LjkwOTA5MSA1MjcuNjM5MjczIDM0LjkwOTA5MWMxMjIuOTczMDkxIDAgMTk4LjcwMjU0NSA3NS4zMTA1NDUgMjIyLjc0MzI3MiAyMTUuMTA5ODE4aDg2LjY2NzYzN2E2NCA2NCAwIDAgMSA2My42MDQzNjMgNTYuODU1MjczbDY3LjM3NDU0NiA1OTkuNDM1NjM2QTY0IDY0IDAgMCAxIDkwNC40MjQ3MjcgOTc3LjQ1NDU0NUgxNDguMjAwNzI3YTY0IDY0IDAgMCAxLTYzLjYwNDM2My03MS4xNDQ3MjdMMTUxLjk3MDkwOSAzMDYuODc0MTgyYTY0IDY0IDAgMCAxIDYzLjYwNDM2NC01Ni44NTUyNzNoODIuODk3NDU0eiBtNzEuNDI0IDBoMzA5LjU1MDU0NkM2NTkuNTk1NjM2IDE0OS45OTI3MjcgNjEwLjI4MDcyNyAxMDQuNzI3MjczIDUyNy42MzkyNzMgMTA0LjcyNzI3M2MtODIuODA0MzY0IDAtMTM0LjE5MDU0NSA0NS41MjE0NTUtMTU3Ljc0MjU0NiAxNDUuMjkxNjM2eiBtLTE0OS4xMzE2MzYgNjkuODE4MTgyTDE1NC42OTM4MTggOTA3LjYzNjM2NGg3NDMuMjE0NTQ2bC02Ni4wNzEyNzMtNTg3Ljc5OTI3M0gyMjAuNzY1MDkxeiIgcC1pZD0iNzY1NCI+PC9wYXRoPjwvc3ZnPg=="
					 mode="widthFix"></image>
					取餐
				</navigator>
				<text class="icon icon-keyboard_arrow_right"></text>
			</view>
			<view class="item">
				<navigator url="../orderList/orderList" class="opt" hover-class="none">
					<image src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk0OTgyODA3MDIwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc0MDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjY3LjgxODY2NyA2MzYuOTI4SDM3Ni42NjEzMzNjLTE4Ljc3MzMzMyAwLTM0LjEzMzMzMyAxNS4zNi0zNC4xMzMzMzMgMzQuMTMzMzMzczE1LjM2IDM0LjEzMzMzMyAzNC4xMzMzMzMgMzQuMTMzMzM0aDI5MS4xNTczMzRjMTguNzczMzMzIDAgMzQuMTMzMzMzLTE1LjM2IDM0LjEzMzMzMy0zNC4xMzMzMzRzLTE1LjM2LTM0LjEzMzMzMy0zNC4xMzMzMzMtMzQuMTMzMzMzeiIgcC1pZD0iNzQwOSI+PC9wYXRoPjxwYXRoIGQ9Ik03OTIuMjM0NjY3IDE4OS40NGEyNDYuMjAzNzMzIDI0Ni4yMDM3MzMgMCAwIDAtMTc1LjEwNC03Mi41MzMzMzNIMjgxLjk0MTMzM2MtNTYuNDkwNjY3IDAtMTAyLjQgNDUuOTA5MzMzLTEwMi40IDEwMi40djU4My4zMzg2NjZjMCA1Ni40OTA2NjcgNDUuOTA5MzMzIDEwMi40IDEwMi40IDEwMi40aDQ4MC40MjY2NjdjNTYuNDkwNjY3IDAgMTAyLjQtNDUuOTA5MzMzIDEwMi40LTEwMi40VjM2NC43MTQ2NjdjMC4xNzA2NjctNjYuMzg5MzMzLTI1LjYtMTI4LjUxMi03Mi41MzMzMzMtMTc1LjI3NDY2N3ogbTQuMjY2NjY2IDYxMy4wMzQ2NjdjMCAxOC43NzMzMzMtMTUuMzYgMzQuMTMzMzMzLTM0LjEzMzMzMyAzNC4xMzMzMzNIMjgxLjk0MTMzM2MtMTguNzczMzMzIDAtMzQuMTMzMzMzLTE1LjM2LTM0LjEzMzMzMy0zNC4xMzMzMzNWMjE5LjMwNjY2N2MwLTE4Ljc3MzMzMyAxNS4zNi0zNC4xMzMzMzMgMzQuMTMzMzMzLTM0LjEzMzMzNGgzMzUuMTg5MzM0YzQ3Ljk1NzMzMyAwIDkzLjAxMzMzMyAxOC42MDI2NjcgMTI2LjgwNTMzMyA1Mi41NjUzMzRzNTIuNTY1MzMzIDc5LjAxODY2NyA1Mi41NjUzMzMgMTI2Ljk3NnY0MzcuNzZ6IiBwLWlkPSI3NDEwIj48L3BhdGg+PC9zdmc+"
					 mode="widthFix"></image>
					订单中心
				</navigator>
				<text class="icon icon-keyboard_arrow_right"></text>
			</view>
			<view class="item">
				<view url="" class="opt">
					<image src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk0OTgzMjQyODk5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc4OTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDgxLjgzNDY2NyAzNTMuODM0NjY3YTQyLjYyNCA0Mi42MjQgMCAxIDEgNjAuMzMwNjY2IDYwLjMzMDY2NiA0Mi42MjQgNDIuNjI0IDAgMSAxLTYwLjMzMDY2Ni02MC4zMzA2NjZ6TTUxMiA0NjkuMzMzMzMzYTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEgNDIuNjY2NjY3IDQyLjY2NjY2N3YxNzAuNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEtODUuMzMzMzM0IDB2LTE3MC42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA0Mi42NjY2NjctNDIuNjY2NjY3eiBtMC0zNDEuMzMzMzMzYy0yMTIuMDk2IDAtMzg0IDE3MS45MDQtMzg0IDM4NHMxNzEuOTA0IDM4NCAzODQgMzg0IDM4NC0xNzEuOTA0IDM4NC0zODQtMTcxLjkwNC0zODQtMzg0LTM4NHogbTAtODUuMzMzMzMzYzI1OS4yIDAgNDY5LjMzMzMzMyAyMTAuMTMzMzMzIDQ2OS4zMzMzMzMgNDY5LjMzMzMzM3MtMjEwLjEzMzMzMyA0NjkuMzMzMzMzLTQ2OS4zMzMzMzMgNDY5LjMzMzMzM1M0Mi42NjY2NjcgNzcxLjIgNDIuNjY2NjY3IDUxMiAyNTIuOCA0Mi42NjY2NjcgNTEyIDQyLjY2NjY2N3oiIHAtaWQ9Ijc4OTgiPjwvcGF0aD48L3N2Zz4="
					 mode="widthFix"></image>
					版本号
				</view>
				<text class="item-right">Version:0.0.1</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountInfo: {
					url: '../../static/logo.png',
					username: '铅笔'
				}
			}
		},
		created() {
			// this.accountInfo = uni.getAccountInfoSync();
			// console.log(uni.getAccountInfoSync())
		},
		methods: {

		}
	}
</script>

<style>
	.user {
		background-color: #F1F1F1;
		width: 100vw;
		height: 100vh;
	}

	.user-info {
		display: flex;
		height: 180rpx;
		background-color: #F8F8F8;
		align-items: center;
		margin-bottom: 50rpx;
		border-bottom: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.avatar {
		width: 128rpx;
		height: 128rpx;
		margin: 0 50rpx;
	}

	.avatar image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.username {
		font-size: 38rpx;
		font-weight: 700;
		line-height: 28rpx;
	}

	.operate {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #F8F8F8;
		border-radius: 20rpx;
		width: 94%;
		justify-content: space-between;
		margin: 0 auto;
		padding: 0 20rpx;
	}

	.item {
		display: flex;
		align-items: center;
		font-size: 36rpx;
		/* line-height: 72rpx; */
		height: 72rpx;
		/* margin: 20rpx 0; */
		padding: 52rpx 0;
		justify-content: space-between;
		width: 100%;
		position: relative;
	}

	.item::after {
		content: '';
		display: block;
		left: 0;
		bottom: 0;
		width: 100%;
		position: absolute;
		border-top: 2rpx solid rgba(7, 17, 27, 0.1);
	}

	.item:last-child::after {
		border: none;
	}

	.item image {
		width: 52rpx;
		height: 52rpx;
		margin-right: 20rpx;
	}

	.opt {
		display: flex;
		align-items: center;
		width: 100%;
	}
</style>
