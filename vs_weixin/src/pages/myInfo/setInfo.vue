<template>
	<div class="set">
		<div class="head">
			<img :src="url" alt="">
		</div>
		<div class="form">
			<div class="item">
				<div class="title">昵称</div>
				<input type="text" :value="nickname">
			</div>
			<div class="item">
				<div class="title">电话号码</div>
				<input type="text" :value="tel">
			</div>
			<div class="item">
				<div class="title">驾驶车辆</div>
				<input type="text" :value="car">
			</div>
			<div class="item">
				<div class="title">生日</div>
				<input type="text" :value="birthday">
			</div>
			<div class="item">
				<div class="title">性别</div>
				<van-radio-group v-model="gender" direction="horizontal" class="gender">
					<van-radio name="0">男</van-radio>
					<van-radio name="1">女</van-radio>
				</van-radio-group>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			url: '../../static/my/head.jpg',
			nickname: '',
			tel: '',
			birthday: '',
			gender: '',
			car: ''
		}
	},
	mounted () {
		// this.url = uni.getStorageSync('user').url;
		this.nickname = uni.getStorageSync('user').nickname;
		this.tel = uni.getStorageSync('user').tel;
		this.birthday = uni.getStorageSync('user').birthday.split('T')[0];
		this.gender = uni.getStorageSync('user').gender.toString();
		this.car = uni.getStorageSync('driver').carClass;
	}
}
</script>

<style lang="less" scoped>
.set {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #fff;
	.head{
		width: 100%;
		text-align: center;
		height: 30%;
		padding: 80upx;
		box-sizing: border-box;
		img {
			width: 200upx;
			height: 200upx;
			border-radius: 50%;
		}
	}
	.form {
		height: 70%;
		padding: 0 40upx;
		.item {
			.title {
				font-size: 32upx;
				margin-bottom: 10upx;
				color: rgb(179, 177, 177);
			}
			input {
				border-bottom: 1px solid rgb(228, 222, 222);
				padding: 10upx 0;
				margin-bottom: 30upx;
			}
			.gender {
				transform: translateX(62%);
			}
		}
		
	}
}
</style>