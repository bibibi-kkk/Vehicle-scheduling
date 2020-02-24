<template>
  <view class="home" v-if="isUser">
    <div class="carType">
      <div class="title">车量信息</div>
      <div class="nav">
        <div class="nav-item" v-for="(item,index) in cars" :key="index" @click="tab(index)">{{item.name}}</div>
      </div>
      <div class="card">
        <div class="img">
          <image :src="selectCar.img" mode=""></image>
        </div>
        <div class="container">
          <div class="name">{{selectCar.name}}</div>
          <div class="detail">
            {{selectCar.detail}}
           </div>
           <div class="todetail">
             <image src="../static/详情.png" mode=""></image>
           </div>
        </div>
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
        selectCar: {},
        cars: [{
          tab: 0,
          name: '轿车',
          img: '../static/c8937ad5f77ccbd764ada91b94313319.jpg',
          detail: '权珉值是我的'
        },{
          tab: 1,
          name: '中型车',
          img: '../static/p218826117.webp',
          detail: '我要去蹦迪'
        },{
          tab: 2,
          name: '货车',
          img: '../static/p218826162.webp',
          detail: '要吃海底捞'
        }]
      };
    },
    mounted() {
      this.selectCar = this.cars[0];
    },
    methods: {
      tab(index) {
        this.selectCar = this.cars[index];  
      }
    }
  }
</script>

<style lang="less">
  .home {
    .carType {
      .title {
        font-size: 46upx;
        margin: 40upx 0 0 40upx;
        font-weight: bold;
      }
      .nav {
        display: flex;
        margin: 20upx 0;
        border-bottom: 2px solid #f0f0f0;
        color: #808080;
        .nav-item {
          margin: 0 40upx;
          padding: 20upx 10upx;
          border-bottom: 6upx solid pink;
        }
      }

      .card {
        position: relative;

        .img {
          width: 90%;
          margin: 0 auto;

          image {
            border-radius: 10px;
            width: 100%;
            height: 400upx;
          }
        }

        .container {
          position: absolute;
          top: 300upx;
          background: #fff;
          width: 80%;
          border-radius: 10px;
          left: 50%;
          margin-left: -40%;
          padding: 40upx 0 0 40upx;
          box-sizing: border-box;
          .name {
            font-size: 40upx;
            font-weight: bold;
          }

          .detail {}
          .todetail {
            position: absolute;
            bottom: 0;
            right: 40upx;
            image {
              width: 40upx;
              height: 40upx;
            }
          }
        }
      }
    }
  }
</style>
