import Taro from '@tarojs/taro'
import { ApplicationConfigurationDto } from '../applicationconfiguration/models';
import options from "../../options";
import request from '../../request';
import {getApplicationConfiguration,applicationConfiguration} from '../applicationconfiguration'
/**
 * 验证微信小程序登录方式是否存在,验证成功后才执行登录
 * @returns true:执行登录 ,false:不执行步骤,待需要用到用户数据时进行注册并获取详细信息
 */
function getWeChatSession() {
    return new Promise<Code2SessionResponse>((resolve, reject) => {
        Taro.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    const header = {
                        'content-type': 'application/json',
                    }
                    if (options.Tenant) {
                        header['__tenant'] = options.Tenant;
                    }
                    Taro.request({
                        url: `${options.SSO_AUTHORITY}/account/WeChatMiniLogin/${res.code}`,
                        method: "GET",
                        header,
                        success: (response) => {
                            console.log(response);
                            if (response.data.error) {
                                return reject(response.data.error)
                            }
                            return resolve(response.data)
                        },
                        fail: (err) => reject(err.errMsg)
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                    reject(res.errMsg)
                }
            }
        });
    })
}

interface Code2SessionResponse {
    /** 微信id */
    openId: string;
    sessionKey: string;
    unionId: string;
}

const AccessToken = 'Access-Token';

/**
 *  使用code获取到session进行登录
 * @param session 
 * @returns 
 */
function loginByOpenId(openid: string) {
    if (!openid) { }
    return connectToken({ grant_type: 'WeChatMiniProgram_credentials', openid })
}

function connectToken(params: any) {
    return new Promise((resolve, reject) => {
        const formData = {
            scope: options.SSO_SCOPE,
            client_id: options.SSO_CLIENT_ID,
            client_secret: '1q2w3e*',
            ...params
        }
        const header = {
            'content-type': 'application/x-www-form-urlencoded',
        }
        if (options.Tenant) {
            header['__tenant'] = options.Tenant;
        }
        Taro.request({
            url: `${options.SSO_AUTHORITY}/connect/token`,
            method: "POST",
            data: formData,
            header,
            success: (response) => {
                console.log(response);
                if (response.data.error) {
                    return reject(response.data)
                }
                Taro.setStorageSync(AccessToken, response.data.access_token)
                resolve(response.data.access_token)
            },
            fail: (err) => {
                console.log('请求错误', err)
                reject(err);
            }
        })
    });
}

function loginByPhoneNumberAndCode(phoneNumber: string, code: string) {
    return connectToken({ grant_type: 'PhoneNumber', phoneNumber, code }).then(() => Promise.resolve(getApplicationConfiguration()))
}

function loginByPhoneNumberAndOpenId(phoneNumber: string, openId: string) {
    return connectToken({ grant_type: 'PhoneNumber', phoneNumber, openId }).then(() => Promise.resolve(getApplicationConfiguration()))
}

// function getApplicationConfiguration() {
//     request.get<ApplicationConfigurationDto>('/api/abp/application-configuration').then(res => {
//         console.log('ApplicationConfigurationDto', res)
//         if (!res.currentUser?.isAuthenticated) {
//             console.log('用户校验已过需重新登录')
//         }
//     })
// }

function sendPhoneCode(phoneNumber: string) {
    const header = {}
    if (options.Tenant) {
        header['__tenant'] = options.Tenant;
    }
    return new Promise((resolve, reject) => {
        Taro.request({
            url: `${options.SSO_AUTHORITY}/account/sms-login/sender/${phoneNumber}`,
            method: "GET",
            success: (response) => resolve(response.data),
            fail: (err) => reject(err.errMsg)
        })
    })

}

// function autoLogin() {
//     const token = Taro.getStorageSync(AccessToken);
//     if (token) {
//         // get config
//         getApplicationConfiguration();
//     } else {
//         getWeChatSession().then(session => loginByOpenId(session).then(() => getApplicationConfiguration()))
//     }
// }

export {
    sendPhoneCode, loginByPhoneNumberAndCode, loginByOpenId,loginByPhoneNumberAndOpenId
}