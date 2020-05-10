<template>
	<div class="order">
		<van-dialog v-model="show" :message="msg">
		</van-dialog>
		<div class="nav">
			<van-steps v-if="order.state!==3 && order.state!==4 && order.state!==5" :active="active" active-icon="success" active-color="#38f">
				<van-step>审核中</van-step>
				<van-step>通过审核</van-step>
				<van-step>待出行</van-step>
				<van-step>已完结</van-step>
			</van-steps>
			<div class="notice" v-else><img src="../../static/order/cancel.png" alt=""> 该订单已被{{notice}}</div>
		</div>
		<div class="basic">
			<orderBasic :data="order"></orderBasic>
		</div>
		<div class="car" v-if="order.state!==5 && order.state!==0">
			<car :data="car"></car>
		</div>
		<div class="driver" v-if="order.state!==5 && order.state!==0">
			<driver v-if="role===2" :data="driver"></driver>
			<dispatchar v-else :data="dispatchar" :approvalTime="order.approvalTime"></dispatchar>
		</div>
		<!-- <van-button v-if="role === 3 && order.state === 1" color="#22a6b3" block class="btn" @click="toConfirm">申请</van-button> -->
		<van-button v-if="role === 3 && order.state === 1" color="#22a6b3" block class="btn" @click="toConfirm">确认</van-button>
		<van-button v-if="role === 2 && order.state !== 4 && order.state !== 5 && order.state !== 6" color="#22a6b3" block class="btn" @click="toConcel">取消订单</van-button>
	</div>
</template>

<script>
import orderBasic from '../../components/orderBasic'
import driver from '../../components/driver'
import dispatchar from '../../components/dispatchar'
import car from '../../components/car'
export default {
	data () {
    return {
			active: -1,
			order: {},
			driver: {},
			car: {},
			dispatchar: {},
			orderId: '6001',
			role: null,
			notice: '',
			show: false,
			msg: null
		}
  },
	components: {
		orderBasic,
		driver,
		dispatchar,
		car
	},
	onLoad: function (option) {
		this.orderId = option.id
	},
	mounted () {
		this.role = uni.getStorageSync('user_role')
		this.getOrder()
	},
	methods: {
		getOrder () {
			this.$axios.post('/order/getOrder/id', { orderId: this.orderId }).then(res => {
				this.order = res.data.data[0]
				this.order.departureTime = `${this.order.departureTime.split('T')[0]} ${this.order.departureTime.split('T')[1].split('.')[0]}`
				this.order.createTime = `${this.order.createTime.split('T')[0]} ${this.order.createTime.split('T')[1].split('.')[0]}`
				switch (this.order.state) {
					case 0:
						this.active = 0
						break;
					case 1:
						this.active = 1
						break;
					case 2:
						this.active = 2
						break;
					case 3:
						this.notice = 2
						break;
					case 4:
						this.notice = 2
						break;
					case 6:
						this.active = 3
						break;
				}
				if (this.role === 2) {
					// 普通用户
					switch (this.order.state) {
						case 5:
							this.notice = '驳回'
							break;
						case 3:
							this.notice = '司机取消，等待调度员安排新的司机'
							break;
						case 4:
							this.notice = '您取消'
							break;
					}
					this.$axios.post('/user/getUser/id', { id: this.order.driver }).then(res => {
						this.driver = res.data.data[0]
					})
				} else {
					// 司机
					switch (this.order.state) {
						case 3:
							this.notice = '您取消'
							break;
						case 4:
							this.notice = '用户取消'
							break;
					}
					this.$axios.post('/user/getUser/id', { id: this.order.approvalUser }).then(res => {
						this.dispatchar = res.data.data[0]
					})
				}
				if (this.order.state!==0 && this.order.state!==5) {
					this.order.approvalTime = `${this.order.approvalTime.split('T')[0]} ${this.order.approvalTime.split('T')[1].split('.')[0]}`
					this.$axios.post('/car/getCarAndClass/id', { id: this.order.car }).then(res => {
						this.car = res.data.data[0]
					})
				}
			})
		},
		toConfirm () {
			this.$axios.post('/order/updateOrderState/id', { id: this.orderId, state: 2 }).then(res => {
				this.show = true
				if (res.data.code === 0) {
					this.msg = '确认成功，将通知用户'
					this.order = {}
					this.getOrder()
				} else {
					this.msg = '确认失败，请重试'
				}
			})
		},
		// 用户取消订单
		toConcel () {
			this.$axios.post('/order/updateOrderState/id', { id: this.orderId, state: 4 }).then(res => {
				this.show = true
				if (res.data.code === 0) {
					this.msg = '订单取消成功'
					this.order = {}
					this.getOrder()
				} else {
					this.msg = '取消失败，请重试'
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.order {
	.nav {
		.notice {
			display: flex;
			align-items: center;
			background: #fff;
			padding: 6px;
			justify-content: center;
			font-size: 32upx;
			color: rgb(67, 72, 77);
			img {
				width: 100upx;
				height: 100upx;
				margin-right: 20upx;
			}
		}
	}
	.btn {
		position: absolute;
		// bottom: 40upx;
		width: 50%;
		left: 50%;
		height: 80upx;
		line-height: 80upx;
		transform: translateX(-50%);
	}
}
</style>