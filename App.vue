<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page,
	view,
	input,
	text,
	form,
	navigator,
	rich-text,
	picker,
	scroll-view,
	cover-view,
	open-data {
		box-sizing: border-box;
	}

	rich-text,
	open-data,
	form {
		display: block;
	}

	del {
		color: #999;
		text-decoration: line-through;
	}

	image {
		display: block;
	}

	cover-view {
		line-height: 1.5;
		white-space: normal;
	}

	page {
		font-size: 28rpx;
		font-weight: 300;
		line-height: 1.5;
		color: #404040;
		background: #f8f8f8;
		font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif;
	}

	/* 隐藏默认滚动条 */
	page,
	view,
	input,
	text,
	form,
	navigator,
	rich-text,
	picker,
	scroll-view,
	cover-view,
	open-data {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
