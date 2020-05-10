<template>
  <div class="login">
    <div class="box-login" :class="{ loginhide: !isLogin }">
      <div class="head"></div>
      <div class="title">登录</div>
      <div class="container">
        <div class="name">
          <label for="">手机号</label>
          <input type="text" placeholder="请输入手机号" v-model="objLogin.phoneNum">
        </div>
        <div class="password">
          <div class="top">
            <label for="">密码</label>
            <span>忘记密码？</span>
          </div>
          <input type="password" placeholder="请输入密码" v-model="objLogin.password">
        </div>
        <div class="tip">{{tip}}</div>
        <div class="button" @click="login()">登录</div>
      </div>
      <div class="register">没有账号？
        <div class="a" @click="toRegister()">立即注册</div>
      </div>
    </div>
    <div class="box-register" :class="{ loginhide: isLogin }">
      <div class="head"></div>
      <div class="title">注册</div>
      <div class="container">
        <div class="name">
          <label for="">手机号</label>
          <input type="text" placeholder="请输入手机号" v-model="objRegister.phoneNum">
        </div>
        <div class="nikeName">
          <label for="">昵称</label>
          <input type="text" placeholder="请输入昵称" v-model="objRegister.nickName">
        </div>
        <div class="password">
          <div class="top">
            <label for="">密码</label>
          </div>
          <input type="password" placeholder="请输入密码" v-model="objRegister.password">
        </div>
        <div class="tip">{{ttip}}</div>
        <div class="button" @click="register()">注册</div>
      </div>
      <div class="register">已有账号？
        <div class="a" @click="toLogin()">立即登录</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      isLogin: true,
      tip: '',
      ttip: '',
      objLogin: {
        phoneNum: '',
        password: ''
      },
      objRegister: {
        phoneNum: '',
        nickName: '',
        password: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    login () {
      this.tip = ''
      if (!(/^1[3456789]\d{9}$/.test(this.objLogin.phoneNum))) {
        this.tip = '请输入正确的手机号'
        return
      }
      if (!(/^[\w]{6,12}$/.test(this.objLogin.password))) {
        this.tip = '密码格式不正确'
        return
      }
      this.$https.post('/web/login', this.objLogin).then(res => {
        if (res.data.success) {
          sessionStorage.setItem('userId', res.data.user.id)
          sessionStorage.setItem('user', JSON.stringify(res.data.user))
          this.$router.push('/')
        }
      }).catch(err => {
        this.tip = err.response.data.msg
      })
    },
    register () {
      this.ttip = ''
      if (!(/^1[3456789]\d{9}$/.test(this.objRegister.phoneNum))) {
        this.ttip = '请输入正确的手机号'
        return
      }
      if (!(/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,16}$/.test(this.objRegister.nickName))) {
        this.ttip = '请设置3-16位的昵称'
        return
      }
      if (!(/^[\w]{6,12}$/.test(this.objRegister.password))) {
        this.ttip = '密码为6-12位包含字母、数字或下划线'
        return
      }
      this.$https.post('/web/register', this.objRegister).then(res => {
        if (res.data.msg === '注册成功') {
          alert('注册成功')
          this.isLogin = true
        }
      }).catch(err => {
        this.ttip = err.response.data.msg
      })
    },
    toRegister () {
      this.isLogin = false
    },
    toLogin () {
      this.isLogin = true
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .box-register {
    .nikeName {
        margin-bottom: 20px;
      label {
          display: block;
          margin-bottom: 10px;
        }
        input {
          display: block;
          width: 100%;
          border: none;
          border-radius: 3px;
          padding: 15px 20px;
          box-sizing: border-box;
          outline: 0;
          color: #44a0b3;
          background: rgba(68, 160, 179, .06);
          &::placeholder {
            color: rgba(68, 160, 179, .5);
          }
        }
    }
  }
  .box-login,.box-register {
    animation-name: change;
    position: relative;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    min-width: 280px;
    padding: 70px 25px 25px 25px;
    background: #fff;
    box-shadow: 0 0 25px rgba(0, 0, 0, .1);
    color: rgba(68, 160, 179, .5);
    font-weight: 700;
    .head {
      width: 100px;
      height: 100px;
      background: pink;
      border-radius: 50%;
      position: absolute;
      margin-top: -120px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
    }
    .title {
      text-align: center;
      margin-bottom: 20px;
    }
    .container {
      .tip {
        color: #fc1616;
        font-size: 0.7rem;
      }
      .name,.password {
        margin-bottom: 20px;
        label {
          display: block;
          margin-bottom: 10px;
        }
        input {
          display: block;
          width: 100%;
          border: none;
          border-radius: 3px;
          padding: 15px 20px;
          box-sizing: border-box;
          outline: 0;
          color: #44a0b3;
          background: rgba(68, 160, 179, .06);
          &::placeholder {
            color: rgba(68, 160, 179, .5);
          }
        }
      }
      .name {

      }
      .password {
        .top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          label {
            margin-bottom: 0;
          }
          span {
            color: #44a0b3;
            font-weight: bold;
            font-size: 0.8rem;
            cursor: pointer;
          }
        }
      }
      .button {
        width: 100%;
        background: #44a0b3;
        color: #fff;
        line-height: 40px;
        font-weight: 700;
        border-radius: 3px;
        text-align: center;
        margin: 30px 0 30px;
        cursor: pointer;
      }
    }
    .register {
      text-align: center;
      .a {
        display: inline-block;
        color: #44a0b3;
        cursor: pointer;
      }
    }
  }
  .loginhide {
    display: none;
  }
}
@keyframes change {
  0% {
    transform: rotate3d(0);
  }
  100% {
    opacity: 0;
    transform: rotate3d(0, 1, 0, 180deg);
}
}
</style>
