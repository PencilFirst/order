const BASE_URL = 'http://ustbhuangyi.com/sell/api'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:options.url,
			method:BASE_URL + options.method || 'GET',
			data:options.data || {},
			success: (res) => {
				if(res.data.errno !== 0){
					return uni.showToast({
						title:'获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
} 