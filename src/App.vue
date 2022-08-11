<template>
  <div id="app">
    <!-- 头部导航 -->
    <van-nav-bar id="page-nav-bar" title="首页" />
    <!-- 表单输入 -->
    <van-form @submit="onSubmit">
      <van-field name="用户名" placeholder="请输入手机号">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field type="password" name="密码" placeholder="请输入验证码">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button round class="send-sms-btn" size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button block type="info" class="ii" native-type="submit" style="backgroundColor:#6db4fb">登录</van-button>
      </div>
    </van-form>
    <!-- 路由的出口 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
  },
}
</script>
<style lang="less">
.van-field {
  .toutiao {
    font-size: 36px;
  }
}

.van-field__button {
  .send-sms-btn {
    background-color: #ededed;
    color: #666;
    font-size: 22px;
  }
}

.login-btn-wrap {
  padding: 53px 33px;
}
</style>
