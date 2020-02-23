<template>
	<view class="home" v-if="isUser">
		<div class="carType">
      <div class="title">车型展示</div>
      <div class="nav">
        <div class="nav-item" v-for="(item,index) in carType">{{item}}</div>
      </div>
      <div class="card">
        <div class="img"></div>
        <div class="title"></div>
        <div class="detail"></div>
      </div>
    </div>
	</view>
	<view class="home" v-else>
		司机首页
	</view>
</template>

<script>
	export default {
		data() {
			return {
         isUser: true,
         carType: ['轿车','中型','货车']
			};
		}
	}
</script>

<style lang="less">
.home {
  .carType {
    .nav {
      display: flex;
    }
  }
}
</style>
