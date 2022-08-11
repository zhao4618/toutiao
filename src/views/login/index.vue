<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar id="page-nav-bar" title="首页" />
    <!-- 表单输入 -->
    <van-form @submit="onSubmit">
      <van-field name="手机号" v-model="user.mobile" placeholder="请输入手机号">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="验证码" v-model="user.code" placeholder="请输入验证码">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button round class="send-sms-btn" size="small" type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      user: {
        mobile: "", //手机号
        code: "", //短信验证码
      },
    };
  },
  methods: {
    async onSubmit() {
      //  1获取表单数据
      const user = this.user;
      //2表单验证
      //在组建中必须通过this.$toast来调用Toast组件
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true, //禁用背景点击
        duration:0//持续时间默认是2000 2秒 如果为0 则持续展示
      });
      //3提交表单请求登录
      try {
        const res = await login(user);
        console.log(res);
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.request.status === 400) {
          console.log("手机号或验证码错误");
          this.$toast.fail("手机号或验证码错误")
        } else {
          console.log("登录失败", err);
          this.$toast.fail("登录失败")
        }
      }
      //4根据请求的响应结果处理后继操作
    },
  },
};
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
  border: none;
  background-color: #fff;
  .van-button {
    background-color: #6db4fb;
  }
}
</style>