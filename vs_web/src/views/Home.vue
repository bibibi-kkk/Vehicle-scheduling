<template>
  <div class="home">
    <div class="nav">
      <div class="logo">车辆调度系统</div>
      <div class="user">
          <div class="navigator">
          <img :src="user.avatarurl" alt />
            {{user.nickname}}
            <a-popover>
              <template slot="content">
                <p>退出登录</p>
              </template>
              <a-icon @click="logout" class="hover" type="arrow-right" />
            </a-popover>
          </div>
      </div>
    </div>
    <div class="content">
      <div class="sidenav">
        <div class="title">功能选择</div>
        <div class="nav-item" @click="item_choose('carManagement')">
          <div v-if="item === 'carManagement'" class="active"></div>
          <div class="i"><img src="../../public/车辆 (1).png" alt=""></div>
          <div class="text">车辆管理</div>
        </div>
        <div class="nav-item" @click="item_choose('driverManage')">
          <div class="active" v-if="item === 'driverManage'"></div>
          <div class="i"><img src="../../public/司机信息管理 (1).png" alt=""></div>
          <div class="text">司机管理</div>
        </div>
        <div class="nav-item" @click="item_choose('dispatcharManage')">
          <div class="active" v-if="item === 'dispatcharManage'"></div>
          <div class="i"><img src="../../public/司机信息管理 (1).png" alt=""></div>
          <div class="text">调度员管理</div>
        </div>
        <div class="nav-item" @click="item_choose('orderVerify')">
          <div class="active" v-if="item === 'orderVerify'"></div>
          <div class="i"><img src="../../public/KHCFDC_审核 2.png" alt=""></div>
          <div class="text">申请表管理</div>
        </div>
        <div class="nav-item" @click="item_choose('orderManage')">
          <div class="active" v-if="item === 'orderManage'"></div>
          <div class="i"><img src="../../public/订单 (1).png" alt=""></div>
          <div class="text">安排表管理</div>
        </div>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
const data = [{
  name: 'bibi'
}]
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      item: 'carManagement',
      data,
      user: {}
    }
  },
  mounted () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    if (sessionStorage.getItem('key')) {
      this.item = sessionStorage.getItem('key')
    }
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    item_choose (val) {
      this.item = val
      sessionStorage.setItem('key', val)
      this.$router.push(`/${val}`)
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
      // display: flex;
      align-items: center;
      margin-right: 80px;
      .navigator {
        margin-right: 15px;
        font-size: 20px;
        color: #fff;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .hover {
        cursor: pointer;
      }
    }
  }
  .content {
    flex: 85%;
    margin-bottom: 3%;
    display: flex;
      .sidenav {
        width: 15%;
        height: 100%;
        background: linear-gradient(0deg, #f871a5 0%, #1b8294 100%);
        padding: 0 0 0 1.5%;
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
      width: 80%;
      // background: #27293d;
      background: #fff;
      // padding: 5%;
      margin-right:5%;
      padding: 10px;
    }
  }
}
</style>
