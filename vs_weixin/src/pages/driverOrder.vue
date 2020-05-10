<template>
	<div class="driverOrder">
		<div class="card" v-for="(item, index) in orders" :key="index">
			<orderCard :data="item" :order="item"></orderCard>
		</div>
	</div>
</template>

<script>
import orderCard from '../components/orderCard'
export default {
	data () {
		return {
			state: null,
			date: null,
			orders: []
		}
	},
	components: {
		orderCard
	},
	onLoad: function (option) {
		this.state = option.state ? option.state : ''
		this.date = option.date ? option.date : ''
	},
	mounted () {
		this.getOrders()
	},
	methods: {
		getOrders () {
			const obj = {
				id: uni.getStorageSync('user_id'),
				role: uni.getStorageSync('user_role'),
				state: this.state,
				date: this.date
			}
			this.$axios.post('/order/getOrder/user', obj).then(res => {
				res.data.data.forEach((item, index) => {
					if (uni.getStorageSync('user_role') === 3) {
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
							case '已完成':
								item.orderTag ='已完成'
								break;
						}
					} else {
						// 用户
						switch (item.state_name) {
							case '未审核':
								item.orderTag ='待审核'
								break;
							case '驳回':
								item.orderTag ='被驳回'
								break;
							case '已审核':
								item.orderTag ='待司机确认'
								break;
							case '司机取消':
								item.orderTag ='司机取消'
								break;
							case '司机确认':
								item.orderTag ='待出行'
								break;
							case '用户取消':
								item.orderTag ='已取消'
								break;
							case '已完成':
								item.orderTag ='已完成'
								break;
						}
					}
					
					item.createTime = item.createTime.split('T')[0] + ' ' + item.createTime.split('T')[1].split('.')[0]
					item.departureTime = item.departureTime.split('T')[0] + ' ' + item.departureTime.split('T')[1].split('.')[0]
					this.$axios.post('/car/getCarAndClass/id', { id: item.car }).then(res => {
						item.Car = res.data.data[0]
						this.orders.push(item)
					})
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.driverOrder {
	.card {
		padding: 20upx;
	}
}
</style>