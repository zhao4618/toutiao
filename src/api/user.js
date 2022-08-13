// 用户相关请求登录模块
import request from "@/utils/requset";
export const login = (data) => {
    return request({
        method: "POST",
        url: "/v1_0/authorizations",
        data,
    });
};
//发送验证码
export const sendSms = mobile => {
    return request({
        method: "GET",
        url: `/v1_0/sms/codes/${mobile}`
    });
};