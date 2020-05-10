<template>
	<view class="myOrder">
		<div class="card" v-for="(item, index) in orders" :key="index">
			<orderCard :data="item" :order="item"></orderCard>
		</div>
	</view>
</template>

<script>
import orderCard from '../../components/orderCard'
export default {
	data () {
		return {
			role: null,
			orders: [
			]
		}
	},
	components: {
		orderCard
	},
	mounted () {
		this.role = uni.getStorageSync('user_role')
		this.getOrders()
	},
	methods: {
		getOrders () {
			this.$axios.post('/order/getOrder/user', { id: uni.getStorageSync('user_id'), role: this.role, state: '', date: '' }).then(res => {
				res.data.data.forEach((item, index) => {
					item.createTime = item.createTime.split('T')[0] + ' ' + item.createTime.split('T')[1].split('.')[0]
					item.departureTime = item.departureTime ? item.departureTime.split('T')[0] + ' ' + item.departureTime.split('T')[1].split('.')[0] : null
					if (this.role === 2) {
						// 普通用户
						item.orderTag = item.state_name
						if (item.state!==0 && item.state!==5) {
							this.$axios.post('/user/getUser/id', { id: item.driver }).then(res => {
								item.Driver = res.data.data[0]
							})
						}
					} else {
						// 司机
						switch (item.state_name) {
							case '已审核':
								item.orderTag ='待确认'
								break;
							case '司机取消':
								item.orderTag ='已取消'
								break;
							case '司机确认':
								item.orderTag ='待出行'
								break;
							case '用户取消':
								item.orderTag ='用户取消'
								break;
							case '已完成':
								item.orderTag ='已完成'
								break;
						}
					}
					// 存在派遣车辆和司机
					if (item.state!==0 && item.state!==5) {
						this.$axios.post('/car/getCarAndClass/id', { id: item.car }).then(res => {
							item.Car = res.data.data[0]
							this.orders.push(item)
						})
					} else {
						this.orders.push(item)
					}
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.myOrder {
		padding: 0 0 50px 0;
	.card {
		padding: 20upx;
	}
}
</style>