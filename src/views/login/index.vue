<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar id="page-nav-bar" title="首页" />
    <!-- 表单输入  -->
    <van-form ref="loginForm" @submit="onSubmit">
      <!-- 手机号表单验证 -->
      <van-field type="number" maxlength="11" name="mobile" v-model="user.mobile" placeholder="请输入手机号"
        :rules="userFormRules.mobile">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 验证码表单验证 -->
      <van-field type="number" maxlength="6" name="code" v-model="user.code" placeholder="请输入验证码"
        :rules="userFormRules.code">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 发送验证码按钮 -->
        <template #button>
          <!-- vant倒计时组件 -->
          <van-count-down :time="1000 * 5" format="ss s" v-if="idCountDownShow" @finish="idCountDownShow = false" />
          <van-button v-else round class="send-sms-btn" size="small" type="default" native-type="button"
            @click="onSendSms">
            发送验证码</van-button>
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
// 引入登录和发送验证码封装好的请求
import { login, sendSms } from "@/api/user";

export default {
  data() {
    return {
      idCountDownShow: false,
      user: {
        mobile: "", //手机号
        code: "", //短信验证码
      },
      userFormRules: {
        mobile: [{  // 手机号表单验证
          required: true, //true 必填项
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{  //验证码表单验证
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
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
        duration: 0//持续时间默认是2000 2秒 如果为0 则持续展示
      });
      //3提交表单请求登录
      try {
        const { data } = await login(this.user);
        this.$store.commit('setUser', data.data) //vuex提交更改数据
        this.$toast.success('登录成功')  //vant内置弹窗
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
    async onSendSms() {
      // 1.验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('手机号验证成功');
      } catch (err) {
        console.log(err);
        console.log('手机号验证失败');
        return
      }
      // 2.验证通过后显示倒计时
      this.idCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功！')
      } catch (err) {
        this.idCountDownShow = false
        if (err.request.status === 429) {
          this.$toast('发送频繁 请稍后再试！')
        } else {
          this.$toast('发送失败！')
        }
      }
    }
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