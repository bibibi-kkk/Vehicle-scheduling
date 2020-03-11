<template>
	<view class="myOrder">
		<div class="card" v-for="(item, index) in orders" :key="index">
			<orderCard :data="item"></orderCard>
		</div>
	</view>
</template>

<script>
import orderCard from '../../components/orderCard'
export default {
	data () {
		return {
			orders: [
				{
					createtime: '2020-10-01 08:00',
					from: '南京',
					destination: '珠穆朗玛峰',
					departure: '2020-10-13 09:00'
				}
			]
		}
	},
	components: {
		orderCard
	}
}
</script>

<style lang="less" scoped>
.myOrder {
	.card {
		padding: 20upx;
	}
}
</style>