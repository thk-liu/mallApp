import { Component, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Navigator, OpenData } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Checkbox, Button, Toast, Row, Col, Sticky, Cell, Field } from "@taroify/core"
import { Exchange } from "@taroify/icons"
import CountDownButton from './CountDownButton'


import './index.scss'

const Bind = () => {

    const [agree, setAgree] = useState<boolean>(false);
    const [agreeOpen, setAgreeOpen] = useState<boolean>(false);

    const wechatPhoneLogin = () => {
        if (!agree) {
            setAgreeOpen(true);
        }
    }

    const sendPhoneCode = () => {
        console.log('sendPhoneCode')
        return Promise.resolve();
    }

    return (
        <View className='container'>
            <Toast open={agreeOpen} position='top' onClose={() => setAgreeOpen(false)}>请阅读并同意 用户协议和 隐私条款</Toast>


            <View className='userAvatar-container '>
                <Row justify='center'>
                    <Col span='6'> <View className='userAvatar'>
                        <OpenData type='userAvatarUrl' />
                    </View></Col>
                    <Col span='6'>            <Exchange size='40' /></Col>
                    <Col span='6'><View className='userAvatar'>
                        <OpenData type='userAvatarUrl' />
                    </View></Col>
                </Row>
            </View>

            <Cell.Group inset>
                <Field label='手机号' placeholder='请输入手机号' />

                <Field align='center' label='短信验证码' placeholder='请输入短信验证码'>
                    <Field.Button>
                        <CountDownButton sender={sendPhoneCode} />
                    </Field.Button>
                </Field>
            </Cell.Group>

            <View style={{ fontSize: 14, marginTop: 30 }}>
                <Checkbox checked={agree} onChange={() => setAgree(!agree)} />
                请阅读并同意 用户协议 和 隐私条款
            </View>

            <View className='phone-login-bottom'>
                <Button block color='primary' onClick={wechatPhoneLogin}>微信手机号快捷登录</Button>
            </View>

        </View>
    )
}

export default Bind;