<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			// uni.request({
			//     url: 'https://localhost:8080', //仅为示例，并非真实接口地址。
			//     // data: {
			//     //     text: 'uni.request'
			//     // },
			//     // header: {
			//     //     'custom-header': 'hello' //自定义请求头信息
			//     // },
			//     success: (res) => {
			//         console.log(res.data);
			//     }
			// });
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
</style>
