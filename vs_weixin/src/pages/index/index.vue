<template>
	<view class="index" v-if="role === '用户'">
		<van-swipe :autoplay="3000" indicator-color="white" class="swipper">
			<van-swipe-item>1</van-swipe-item>
			<van-swipe-item>2</van-swipe-item>
			<van-swipe-item>3</van-swipe-item>
			<van-swipe-item>4</van-swipe-item>
		</van-swipe>
		<van-grid :column-num="3" square>
			<van-grid-item v-for="(item, index) in grids">
				<img :src="img[index]" alt="">
				{{item.name}}
			</van-grid-item>
		</van-grid>
		<van-tabs class="list">
			<van-tab v-for="item in grids" :title="item.name">
				<div v-for="car in item.cars" class="car" @click="toCarPage(car.id)">
					<div class="left">
						<img src="http://img0.imgtn.bdimg.com/it/u=1811039548,809770862&fm=26&gp=0.jpg" alt="">
					</div>
					<div class="right">
						<div>{{car.type}}</div>
						<div>承载人数：{{car.carryNum}}</div>
					</div>
				</div>
			</van-tab>
		</van-tabs>
	</view>
	<view v-else>
		<div class="driver">
			<div class="bg"></div>
			<div class="content">
				<div class="header">
				<div class="head">
					<img src="../../static/my/head.jpg" alt="">
				</div>
				<div class="text">
					<div class="name">{{userName}}</div>
					<div class="msg">
						<div class="notice" v-if="tobeConfirm" @click="toConfirm">
							<img src="../../static/index/notice.png" alt="">
							<span>您有待确定订单</span>
						</div>
						<div class="else" v-else>今天也要努力工作鸭！</div>
					</div>
				</div>
			</div>
				<div class="center">
					<van-calendar
						class="calendar"
						title="我的行程"
						:show-mark="false"
						:show-subtitle="false"
						color="#39a9ed"
						:poppable="false"
						:show-confirm="false"
						:style="{ height: '750upx' }"
						:min-date="minDate"
						:max-date="maxDate"
						:formatter="formatter"
						@select="toOrderPage"
					/>
				</div>
				<div class="bottom"></div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: [
					'../../static/index/专车.png',
					'../../static/index/面包车.png',
					'../../static/index/敞篷.png',
					'../../static/index/货车.png',
					'../../static/index/大型客运.png',
					'../../static/index/婚车.png',
				],
				grids: [],
				title: 'Hello',
				role: '',
				userName: '',
				orderDate: [],
				tobeConfirm: true,
				minDate: new Date(),
				maxDate: new Date()
			}
		},
		mounted () {
			this.getUser()
		},
		methods: {
			getUser() {
				const userId = '2002'
				this.$axios.post('/user/getUser/id', { id: userId }).then(res => {
					this.role = res.data.data[0].role === 2 ? '用户' : '司机' 
					uni.setStorageSync('user_id', res.data.data[0].id);
					uni.setStorageSync('user_name', res.data.data[0].nickname);
					uni.setStorageSync('user_role', res.data.data[0].role);
					uni.setStorageSync('user', res.data.data[0]);
					if (res.data.data[0].role === 3) {
						// 司机
						this.userName = res.data.data[0].nickname;
						this.$axios.post('/driver/getDriver/id', { id: userId }).then(res => {
							uni.setStorageSync('driver', res.data.data[0]);
						})
						this.getOrderTime()
					} else {
						// 普通用户
						this.getClass()
					}
				})
			},
			getClass () {
				this.$axios.get('/car/getClass').then(res => {
					res.data.data.forEach((item, index) => {
						this.$axios.post('/car/getCar/class', { class: item.id }).then(res => {
							item.cars = res.data.data
							this.grids.push(item)
						})
					})
				})
			},
			getOrderTime () {
				this.$axios.post('/order/getOrder/driver/departureTime', { driverId: uni.getStorageSync('user_id') }).then(res => {
					res.data.data.forEach((item, index) => {
						const obj = {
							year: null,
							month: null,
							day: null,
							state: null
						}
						obj.year = item.departureTime.split('-')[0];
						obj.month = item.departureTime.split('-')[1].substr(0, 1) === '0' ? item.departureTime.split('-')[1].slice(1) : item.departureTime.split('-')[1];
						obj.day = item.departureTime.split('-')[2].split('T')[0].substr(0, 1) === '0' ? item.departureTime.split('-')[2].split('T')[0].slice(1) : item.departureTime.split('-')[2].split('T')[0]
						obj.state = item.state
						console.log(obj)
						this.orderDate.push(obj)
					})
					const lastDay = this.orderDate[this.orderDate.length - 1]
					this.maxDate = new Date(parseInt(lastDay.year), parseInt(lastDay.month) - 1, parseInt(lastDay.day));
				})
			},
			// 日历标记有待确定和待出行
			formatter(day) {
				const year = day.date.getFullYear();
				const month = day.date.getMonth() + 1;
				const date = day.date.getDate();
				let num = 0
				this.orderDate.forEach((item, index) => {
					if (year === parseInt(item.year) && month === parseInt(item.month) && date === parseInt(item.day)) {
						// switch (item.state) {
						// 	case 1:
						// 		day.bottomInfo = '待确认';
						// 	break
						// 	case 2:
						// 		day.bottomInfo = '待出行';
						// 	break
						// }
						num++
						day.bottomInfo = `${num}笔订单 `
					}
				})
				return day;
			},
			// 去车辆页
			toCarPage (carId) {
				uni.navigateTo({
					url: `/pages/index/carPage?id=${carId}`,
				});
			},
			formatDate(date) {
				// console.log((date.getMonth() + 1) < 10) 
				return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
			},
			// 去今日订单页
			toOrderPage (val) {
				console.log(this.formatDate(val))
				uni.navigateTo({
					url: `/pages/driverOrder?date=${this.formatDate(val)}`,
				});
			},
			// 去待确定订单页
			toConfirm () {
				const state = 1
				uni.navigateTo({
					url: `/pages/driverOrder?state=${state}`,
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.index {
		.swipper {
			color: #fff;
			font-size: 20px;
			line-height: 150px;
			text-align: center;
			background-color: #39a9ed;
		}
		.list {
			margin: 20upx 0 120upx 0;
			.car {
				display: flex;
				width: 100%;
				height: 200upx;
				background: #fff;
				padding: 20upx;
				box-sizing: border-box;
				.left {
					width: 40%;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.right {

				}
			}
		}
	}
	.driver {
		.bg {
			position: absolute;
			left: 50%;
			transform: translate(-50%,-80px);
			width: 150%;
			height: 600upx;
			background-image: linear-gradient(to bottom , rgb(86, 45, 235), rgb(110, 199, 211));
			border-radius: 80%;
			box-shadow: 0px 10px 10px rgba(124, 129, 179, 0.4);
		}
		.content {
			z-index: 2;
			position: relative;
			padding: 80upx 0;
			box-sizing: border-box;
			.header {
				display: flex;
				align-items: center;
				width: 80%;
				margin: 0 auto;
				color: #fff;
				.head {
					margin-right: 20upx;
					img {
						width: 160upx;
						height: 160upx;
						border-radius: 50%;
						border: 3px solid #fff;
					}
				}
				.text {
					display: flex;
					flex-direction: column;
					.name {
						transform: translateY(-10upx);
					}
					.msg {
						font-weight: 200;
						font-size: 32upx;
						.notice {
							display: flex;
							align-items: center;
							img {
								margin-right: 10upx;
								width: 25px;
								height: 25px;
							}
						}
					}
				}
			}
			.center {
				width: 80%;
				position: relative;
				left: 50%;
				transform: translate(-50%, 40upx);
				.calendar {
					border-radius: 15px;
				}
			}
		}
	}
	.van-calendar__bottom-info {
		color: pink;
		&::before {
			position: absolute;
			content: '';
			width: 5px;
			height: 5px;
			border-radius: 0;
			top: 0;
			left: 0;
			background: pink;
		}
	}
</style>
