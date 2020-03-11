<template>
  <div class="home">
    <div class="nav">
      <div class="logo">bibibi调度系统</div>
      <div class="user">
        <div class="navigator">
          <img src="../../public/p218826117.webp" alt />
        </div>
        <div class="name">bibibi</div>
        <img src="../../public/向下.png" alt="" class="out">
      </div>
    </div>
    <div class="content">
      <div class="sidenav">
        <div class="title">功能选择</div>
        <div class="nav-item" @click="item_choose(1)">
          <div class="active" v-if="item === 1"></div>
          <div class="i"><img src="../../public/车辆 (1).png" alt=""></div>
          <div class="text">车辆管理</div>
        </div>
        <div class="nav-item" @click="item_choose(2)">
          <div class="active" v-if="item === 2"></div>
          <div class="i"><img src="../../public/司机信息管理 (1).png" alt=""></div>
          <div class="text">司机管理</div>
        </div>
        <div class="nav-item" @click="item_choose(3)">
          <div class="active" v-if="item === 3"></div>
          <div class="i"><img src="../../public/KHCFDC_审核 2.png" alt=""></div>
          <div class="text">调度审核</div>
        </div>
        <div class="nav-item" @click="item_choose(4)">
          <div class="active" v-if="item === 4"></div>
          <div class="i"><img src="../../public/订单 (1).png" alt=""></div>
          <div class="text">订单管理</div>
          </div>
      </div>
      <div class="container">
        <carManage v-if="item === 1"></carManage>
        <driverManage v-if="item === 2"></driverManage>
        <orderVerify v-if="item === 3"></orderVerify>
        <orderManege v-if="item === 4"></orderManege>
      </div>
    </div>
  </div>
</template>

<script>
import carManage from '../components/carManage'
import driverManage from '../components/driverManage'
import orderVerify from '../components/orderVerify'
import orderManege from '../components/orderManege'
export default {
  name: 'Home',
  components: {
    carManage,
    driverManage,
    orderVerify,
    orderManege
  },
  data () {
    return {
      item: null
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    show: function () {
      this.$https
        .get('/web/message')
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    item_choose (val) {
      this.item = val
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1e1e2f;
  .nav {
    flex: 12%;
    display: flex;
    align-items: center;
    color: #fff;
    justify-content: space-between;
    .logo {
      margin-left: 60px;
      font-size: 1.2rem;
      font-weight: 400;
    }
    .user {
      display: flex;
      align-items: center;
      margin-right: 80px;
      .navigator {
        margin-right: 5px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .name {
        margin-right: 5px;
      }
      .out {
        width: 15px;
        height: 15px;
      }
    }
  }
  .content {
    flex: 85%;
    margin-bottom: 3%;
    display: flex;
      .sidenav {
        flex: 15%;
        height: 100%;
        background: linear-gradient(0deg, #f871a5 0%, #1b8294 100%);
        padding: 0 2%;
        box-sizing: border-box;
        margin: 0 2%;
        border-radius: 5px;
        box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.6);
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.5;
        color: aliceblue;
        .title {
          border-bottom: 2px solid #fff;
          padding-bottom: 10px;
          margin-bottom: 40px;
          margin-top: 15px;
        }
        .nav-item {
          margin-bottom: 20px;
          display: flex;
          cursor: pointer;
          .active {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: aliceblue;
          }
          .i {
            margin-right: 10px;
            img {
              width: 20px;
              height: 20px;
            }
          }
          .text {
            font-size: 1rem;
            font-weight: 300;
          }
        }
      }
    .container {
      flex: 80%;
      background: #27293d;
      // padding: 5%;
      margin-right:5%;
    }
  }
}
</style>
