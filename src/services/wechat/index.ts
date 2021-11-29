

import Taro, { request } from "@tarojs/taro";
import options from '../options'
import { Code2SessionResponse, EncryptPhoneInput, RegisterByOpenIdAndPhoneInput, RegisterResponse } from "./data";

let wechatSession: Code2SessionResponse={
    openId: "",
    sessionKey: "",
    unionid: ""
};
function getDefaultHeaders() {
    let header = {
    };
    if (options.Tenant) {
        header['__tenant'] = options.Tenant;
    }
    const accessToken = Taro.getStorageSync('Access-Token');
    if (accessToken) {
        header['Authorization'] = `Bearer ${accessToken}`
    }
    return header;
}

const getSeesionKey = (code: string): Promise<Code2SessionResponse> => {
    return new Promise<Code2SessionResponse>((resolve, reject) => {
        return Taro.request({
            url: `${options.SSO_AUTHORITY}/account/wechat-mini-login/wechat-session/${code}`,
            method: "GET",
            header: getDefaultHeaders(),
            success: (result) => resolve(result.data),
            fail: response => reject(response)
        })
    });
}

const login = () => {
    console.log("login",wechatSession);
    if(wechatSession.openId){
        return Promise.resolve(wechatSession);
    }
    return new Promise<Code2SessionResponse>((resolve, reject) => {
        return Taro.login({
            success: (result) => {
                getSeesionKey(result.code).then(session => {
                    console.log(session);
                    wechatSession = session;
                    resolve(session);
                }).catch(e => reject(e));
            },
            fail: response => reject(response)
        })
    })
}

const registerByOpenIdAndPhone = (input: RegisterByOpenIdAndPhoneInput): Promise<RegisterResponse> => {
    return new Promise<RegisterResponse>((resolve, reject) => {
        return Taro.request({
            url: `${options.SSO_AUTHORITY}/account/wechat-mini-login/register-by-openid-and-phone`,
            method: "POST",
            header: getDefaultHeaders(),
            data: input,
            success: (result) => resolve(result.data),
            fail: response => reject(response)
        })
    });
}

const encryptPhone = (input: EncryptPhoneInput): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        return Taro.request({
            url: `${options.SSO_AUTHORITY}/account/wechat-mini-login/encrypt-phone`,
            method: "POST",
            header: getDefaultHeaders(),
            data: input,
            success: (result) => resolve(result.data),
            fail: response => reject(response)
        })
    });
}

export {
    getSeesionKey,
    encryptPhone,
    login,
    registerByOpenIdAndPhone
}