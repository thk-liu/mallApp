import options from "../options";
/**
 * 验证微信小程序登录方式是否存在,验证成功后才执行登录
 * @returns true:执行登录 ,false:不执行步骤,待需要用到用户数据时进行注册并获取详细信息
 */
function getWeChatMiniLoginProvider() {
    return new Promise<ProviderKeyToOpenId>((resolve, reject) => {
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
                        success: (response) => resolve(response.data),
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

interface ProviderKeyToOpenId {
    hasProviderKey: boolean;
    /** 微信id */
    openid: string;
}

function loginByWx() {
    getWeChatMiniLoginProvider().then(loginProvider => {
        if (loginProvider.hasProviderKey) {
            const formData = {
                grant_type: 'WeChatMiniProgram_credentials',
                scope: options.SSO_SCOPE,
                client_id: options.SSO_CLIENT_ID,
                client_secret: '1q2w3e*',
                openid: loginProvider.openid
            }
            const header = {
                'content-type': 'application/x-www-form-urlencoded',
            }
            if (options.Tenant) {
                header['__tenant'] = options.Tenant;
            }
            Taro.request({
                url: `${options.SSO_AUTHORITY}/connect/token`,
                method: "GET",
                data: formData,
                header,
                success: (response) => {
                    Taro.setStorageSync('Access-Token', response.data.accessToken)
                },
                fail: (err) => {
                    console.log('请求错误', err)
                }
            })
        }
    })
}