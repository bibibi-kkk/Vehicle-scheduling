<template>
	<div class="carPage">
		<div class="bg">
			<img :src="car.img" alt="">
		</div>
		<div class="intro">
			<div class="type">{{car.type}}</div>
			<div class="num">承载人数：{{car.carryNum}}</div>
		</div>
		<div class="card">
			<div class="date">
				<van-button color="#22a6b3" block class="btn" @click="toConfirm">申请</van-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			id: '',
			car: {},
			from: '当前定位',
			when: '现在出发'
		}
	},
	onLoad: function (option) {
			this.id = option.id
	},
	mounted () {
		this.getDetail()
	},
	methods: {
		getDetail () {
			this.$axios.post('/car/getCar/id', { id: this.id }).then(res => {
				this.car = res.data.data[0]
			})
		},
		toConfirm () {
			uni.navigateTo({
				url: `/pages/index/orderForm?type=${this.car.type}`,
			});
		}
	}
}
</script>

<style lang="less" scoped>
.carPage {
	// padding: 20upx;
	width: 100%;
	height: 100%;
	.bg {
		width: 100%;
		height: 700upx;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.intro {
		position: absolute;
		top: 400upx;
		width: 90%;
		height: 200upx;
		padding: 30upx;
		border-radius: 12px;
		box-sizing: border-box;
		background: rgba(1, 6, 7, 0.336);
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		.type {
			text-align: left;
			font-size: 68upx;
		}
		.num {
			font-size: 38upx;
		}
	}
	.card {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 600upx;
		background: #fff;
		border-radius: 70upx 70upx 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.date {
				width: 80%;
				height: 100%;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			.box {
				display: flex;
				padding: 30upx;
				box-sizing: border-box;
				background: rgba(126, 131, 133, 0.336);
				border-radius: 15upx;
				.left {
				}
				.right {
				}
				.left, .right {
					width: 50%;
					.title {
						font-size: 26upx;
						color: #fff;
					}
					.value {
						padding: 20upx 0;
						margin-left: 20upx;
						display: flex;
						align-items: center;
						input {
							margin-left: 10upx;
						}
					}
				}
			}
			.btn {
				width: 90%;
				border-radius: 55upx;
				margin: 0 auto;
			}
		}
		
	}
}
</style>