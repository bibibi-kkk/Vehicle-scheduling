<template>
  <view class="myorder">
    <div class="nav">
      <div class="tab" @click="tabChange(0)">已申请</div>
      <div class="tab" @click="tabChange(1)">待出行</div>
      <div class="tab" @click="tabChange(2)">已出行</div>
    </div>
    <div class="orders" v-if="tab === 0">已申请</div>
    <div class="orders" v-if="tab === 1">
      <image src="" mode=""></image>
      <div class="carId">
        <div class="text">车型：房车</div>
        <div class="text">车牌号：123456</div>
      </div>
      <div class="driver">
        <div class="text">司机: 王师傅</div>
        <div class="text">联系电话: 18452485600</div>
      </div>
      <div class="go">
        <div class="text">地点: 学中原餐厅</div>
        <div class="text">时间: 2020-10-13 19:30</div>
      </div>
    </div>
    <div class="orders" v-if="tab === 2">
      <div class="order"></div>
    </div>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isUser: true,
        tab: 0,
        willgoOrders: [{
          time: '',
          carId: '',
          
        },{
          
        },{
          
        }],
        goneOrders: [{
          
        },{
          
        },{
          
        }]
      }
    },
    methods: {
      tabChange(index) {
        this.tab = index;
      }
    }
  }
</script>

<style lang="less" scoped>
  .myorder {
    .nav {
      display: flex;
      width: 100%;
      height: 10%;

      .tab {
        width: 200upx;
        height: 100%;
        border-radius: 10px;
        background: pink;
      }
    }

    .orders {
      height: 90%;
      width: 100%;
    }
  }
</style>
