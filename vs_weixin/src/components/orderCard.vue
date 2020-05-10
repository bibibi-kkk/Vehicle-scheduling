<template>
	<div class="orderCard">
		<div class="title">
			<div class="carType">{{order.carType}}</div>
			<div class="createTime">下单时间 {{order.createTime}}</div>
			<div class="state">
				<van-tag :color="order.state_name === '已审核' || order.state_name === '已完成' || order.state_name === '司机确认' ? '#87d068' : 'red'" plain>
					{{order.orderTag}}
				</van-tag></div>
		</div>
		<div class="content">
			<div class="top">
				<div class="from">{{order.departure}}</div>
				<div class="img"><img src="../static/order/2.png" alt=""></div>
				<div class="to">{{order.destination}}</div>
			</div>
			<div class="bottom" @click="toOrder(order.id)">
				<div class="item"><img src="../static/order/time.png" alt=""><div class="text"> 出发时间： {{order.departureTime}}</div></div>
				<div class="item" v-if="order.state!==0 && order.state!==5 && role === 2"><img src="../static/order/driver.png" alt="">司机：{{order.Driver.nickname}}</div>
				<div class="item" v-if="order.state!==0 && order.state!==5"><img src="../static/order/car.png" alt="">车辆：{{order.Car.carId}}</div>
			</div>
		</div>
	</van-collapse>
	</div>
	
</template>

<script>
export default {
	props: ['data', 'order'],
	data () {
		return {
			role: null,
      activeName: '1'
		}
	},
	mounted () {
		this.role = uni.getStorageSync('user_role')
	},
	methods: {
		toOrder (val) {
			uni.navigateTo({
				url: `/pages/myOrder/order?id=${val}`
			});
		}
	}
}
</script>

<style lang="less" scoped>
.orderCard {
	font-size: 24upx;
	background: #fff;
	.title {
		color: #fff;
		display: flex;
		height: 30px;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px 4px 0 0;
		background: #546de5;
		.carType {
			margin-left: 20upx;
		}
		.state {
			margin-right: 20upx;
		}
	}
	.content {
		.top {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 150upx;
			font-size: 36upx;
			font-weight: 550;
			border-bottom: 1px dashed #f1f2f6 ;
			.img {
				img {
					width: 60upx;
					height: 60upx;
				}
			}
		}
		.bottom {
			padding: 20upx 0;
			.item {
				img {
					width: 40upx;
					height: 40upx;
					margin-right: 10upx;
				}
				padding: 10upx 20upx;
				color: #57606f;
				display: flex;
				align-items: center;
			}
		}
	}
	.card {

	}
}
</style>