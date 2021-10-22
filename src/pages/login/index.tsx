import { Component, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Navigator, OpenData } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Checkbox, Button, Toast } from "@taroify/core"


import './index.scss'

const Login = () => {

    const [agree, setAgree] = useState<boolean>(false);
    const [agreeOpen, setAgreeOpen] = useState<boolean>(false);

    const wechatPhoneLogin = () => {
        if (!agree) {
            setAgreeOpen(true);
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
                <Button block color='primary' onClick={wechatPhoneLogin}>微信手机号快捷登录</Button>
            </View>

            <Navigator className='other-phone-login' url='/pages/bind/index'>
                使用其他手机号登录
            </Navigator>
        </View>
    )
}

export default Login;