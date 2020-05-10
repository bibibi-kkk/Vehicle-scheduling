<template>
  <div class="myInfo">
		<van-dialog v-model="show" title="确认退出？" show-cancel-button>
		</van-dialog>
    <div class="top">
			<div class="title">
				<div class="left">我的</div>
				<div class="right">
					<van-icon name="setting-o" />
				</div>
			</div>
			<div v-if="role == 3" class="intro">今天也请努力工作</div>
			<div v-if="role == 2" class="intro">致力于为您提供更好的出行</div>
    </div>
    <div class="center">
      <div class="card">
        <div class="head">
          <img :src="url" alt />
        </div>
        <div class="right">
          <div class="hello">Hello</div>
          <div class="name">{{name}}</div>
        </div>
        <div class="icon" @click="toSetInfo">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="num">
        <div class="item" @click="toOrder(6)">
          <div class="number">{{comply}}</div>
          <div class="title">已完成</div>
        </div>
        <div class="item" @click="toOrder(2)">
          <div class="number">{{togo}}</div>
          <div class="title">待出行</div>
        </div>
        <div v-if="role == 3" class="item" @click="toOrder(1)">
          <div class="number">{{toConfirm}}</div>
          <div  class="title">待确认</div>
        </div>
        <div v-if="role == 2" class="item" @click="toOrder(0)">
          <div class="number">{{toConfirm}}</div>
          <div  class="title">待审核</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="item" @click="toItem('addressSet')">
				<div class="left">
					<div class="icon"><img src="../../static/my/addressset.png" alt=""></div>
        <div class="text">常用地址设置</div>
				</div>
        <div class="to">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="item" @click="show = true">
				<div class="left">
					<div class="icon"><img src="../../static/my/logout.png" alt=""></div>
					<div class="text">退出登录</div>
				</div>
        <div class="to">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	data () {
		return {
			url: '../../static/my/head.jpg',
			name: '',
			role: '',
			comply: 0,
			togo: 0,
			toConfirm: 0,
			show: false
		}
	},
	mounted () {
		this.name = uni.getStorageSync('user_name')
		this.role = uni.getStorageSync('user_role')
		// this.url = uni.getStorageSync('user_head')
		if (this.role === 2) {
			this.getNums()
		} else if (this.role === 3) {
			// 司机
			this.getNum()
		}
	},
	methods: {
		getNum () {
			this.$axios.post('/order/getOrder/driver/num', { id: uni.getStorageSync('user_id') }).then(res => {
				this.comply = res.data.data[0][0].comply
				this.togo = res.data.data[1][0].togo
				this.toConfirm = res.data.data[2][0].toconfirm
			})
		},
		getNums () {
			this.$axios.post('/order/getOrder/applyer/num', { id: uni.getStorageSync('user_id') }).then(res => {
				this.comply = res.data.data[0][0].comply
				this.togo = res.data.data[1][0].togo
				this.toConfirm = res.data.data[2][0].toconfirm
			})
		},
		toSetInfo () {
			uni.navigateTo({
				url: `/pages/myInfo/setInfo`,
			});
		},
		toOrder (val) {
			uni.navigateTo({
				url: `/pages/driverOrder?state=${val}`,
			});
		},
		toItem (val) {
			uni.navigateTo({
				url: `/pages/myInfo/addressSet`,
			});
		}
	}
};
</script>

<style lang="less" scoped>
.myInfo {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .top {
		padding: 40upx 20upx;
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 48upx;
			font-weight: 500;
		}
    .intro {
			color: #747d8c;
			font-size: 28upx;
			margin: 6upx 0 0;
		}
  }
  .center {
		width: 100%;
		.card {
			width: 90%;
			display: flex;
			background-image: linear-gradient(to bottom , #7A88FF, rgb(252, 126, 168));
			color: #fff;
			border-radius: 15upx;
			margin: 0 auto;
			padding: 20upx 30upx;
			box-sizing: border-box;
			box-shadow: 0px 10px 10px rgba(124, 129, 179, 0.411);
			.head {
				margin-right: 20upx;
				position: relative;
				img {
					width: 160upx;
					height: 160upx;
					border-radius: 50%;
					border: 3px solid #fff;
				}
			}
			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.hello {
					font-weight: 200;
				}
				.name {
					font-weight: 600;
					font-size: 48upx;
					transform: translateY(-30upx);
				}
			}
			.icon {
				transform: translateX(250upx);
				display: flex;
				align-items: center;
			}
		}
		.num {
			display: flex;
			justify-content: space-between;
			text-align: center;
			margin: 60upx;
			padding: 0 30upx;
			.item {
				.number {

				}
				.title {
					margin-top: 10upx;
					color: #747d8c;
					font-size: 28upx;
				}
			}
		}
  }
  .bottom {
		padding: 40upx 20upx 0 20upx;
		border-radius: 40upx 40upx;
		box-shadow: 0px -10px 10px rgba(204, 208, 243, 0.233);
		.item {
			display: flex;
			margin-bottom: 30upx;
			justify-content: space-between;
			.left {
				display: flex;
				align-items: center;
				line-height: 26upx;
				font-size: 34upx;
				.icon {
					margin: 0 15upx;
					img {
						width: 40upx;
						height: 40upx;
					}
				}
			}
			.to {
				font-size: 30upx;
			}
		}
  }
}
</style>