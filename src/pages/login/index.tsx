import { Component, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Navigator, OpenData } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Checkbox, Button, Toast } from "@taroify/core"
import request from '@/services/request'
import { login, encryptPhone, registerByOpenIdAndPhone } from '@/services/wechat'
import { getApplicationConfiguration } from '@/services/app/applicationconfiguration'
import { loginByOpenId } from '@/services/app/login'
import './index.scss'
import { Code2SessionResponse } from '@/services/wechat/data'
import { loginByPhoneNumberAndOpenId } from '@/services/app/login'

const Login = () => {

    const [agree, setAgree] = useState<boolean>(false);
    const [agreeOpen, setAgreeOpen] = useState<boolean>(false);

    const wechatPhoneLogin = (e) => {
        if (e.detail.errMsg === 'getPhoneNumber:ok') {
            login().then((res: Code2SessionResponse) => {
                encryptPhone({
                    iv: e.detail.iv,
                    encryptedData: e.detail.encryptedData,
                    sessionKey: res.sessionKey
                }).then(phoneNumber => {
                    loginByPhoneNumberAndOpenId(phoneNumber, res.openid).then(() => {
                        Taro.switchTab({
                            url: '/pages/index/index'
                        })
                    })
                    // registerByOpenIdAndPhone({ openId: res.openid, phoneNumber }).then(() => {

                    //     loginByOpenId(res.openid).then(() => {
                    //         getApplicationConfiguration().then(res => {
                    //             Taro.switchTab({
                    //                 url: '/pages/home/index'
                    //             })
                    //         })
                    //     })
                    // })
                })
            })

        } else {
            console.log(e.detail.errMsg);
            return;
        }

        if (!agree) {
            setAgreeOpen(true);
            return;
        }


    }

    return (
        <View className='container'>
            <Toast open={agreeOpen} position='top' onClose={() => setAgreeOpen(false)}>请阅读并同意 用户协议和 隐私条款</Toast>

            <View className='userAvatar-container '>
                <View className='userAvatar'>
                    <OpenData type='userAvatarUrl' />
                </View>
            </View>
            <View style={{ fontSize: 14 }}>
                <Checkbox checked={agree} onChange={() => setAgree(!agree)} />
                请阅读并同意 用户协议 和 隐私条款
            </View>

            <View className='wechat-phone-login'>
                <Button block color='primary' openType='getPhoneNumber' onGetPhoneNumber={wechatPhoneLogin}>微信手机号快捷登录</Button>
            </View>

            <Navigator className='other-phone-login' url='/pages/bind/index'>
                使用其他手机号登录
            </Navigator>
        </View>
    )
}

export default Login;