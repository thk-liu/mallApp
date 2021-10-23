import { Component, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Navigator, OpenData } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Checkbox, Button, Toast, Row, Col, Sticky, Cell, Field, Dialog } from "@taroify/core"
import { Exchange } from "@taroify/icons"
import CountDownButton from './CountDownButton'
import { sendPhoneCode, loginByPhoneNumberAndCode } from '@/services/user/wechat-login'

import './index.scss'

const Bind = () => {

    const [agree, setAgree] = useState<boolean>(false);
    const [msgType, setMsgType] = useState<number>(0);
    const [agreeOpen, setAgreeOpen] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('18588688087');
    const [code, setCode] = useState<string>();
    const [success, setSuccess] = useState<boolean>(false);
    const [errDialog, setErrDialog] = useState<boolean>(false);
    const [errData, setErrData] = useState({ error: '', error_description: '' })
    function wechatPhoneLogin() {
        if (!agree) {
            setMsgType(0)
            setAgreeOpen(true)
            return
        }
        if (!code) {
            setMsgType(2)
            setAgreeOpen(true)
            return
        }
        loginByPhoneNumberAndCode(phone, code).then(() => setSuccess(true)).catch(err => { setErrData(err); setErrDialog(true) })

    }

    const sendPhoneVerification = (): boolean => {
        if (phone) {
            sendPhoneCode(phone);
            return true;
        }
        else {
            setMsgType(1);
            setAgreeOpen(true);
            return false;
        }
    }


    return (
        <View className='container'>
            <Toast open={agreeOpen} position='top' onClose={() => setAgreeOpen(false)} duration={1000}>{
                { '0': "请阅读并同意 用户协议和 隐私条款", '1': "请输入手机号码", '2': '请输入验证码' }[String(msgType)]
            }</Toast>
            <Toast open={success} type='success' onClose={() => {
                setSuccess(false)
                Taro.reLaunch({ url: '/pages/index/index' })
            }}
            >登录成功</Toast>
            <Dialog open={errDialog} onClose={() => setErrDialog(false)} >
                <Dialog.Header>{({ 'unsupported_grant_type': '不支持的授权方式', 'invalid_request': '请求无效' }[String(errData.error)]) || '未知原因'}</Dialog.Header>
                <Dialog.Content>{errData.error_description || '登录失败,请稍后重试'}</Dialog.Content>
                <Dialog.Actions>
                    <Button onClick={() => setErrDialog(false)}>确认</Button>
                </Dialog.Actions>
            </Dialog>
            <View className='userAvatar-container '>
                <Row justify='center'>
                    <Col span='6'> <View className='userAvatar'>
                        <OpenData type='userAvatarUrl' />
                    </View></Col>
                    <Col span='6'><Exchange size='40' /></Col>
                    <Col span='6'><View className='userAvatar'>
                        <OpenData type='userAvatarUrl' />
                    </View></Col>
                </Row>
            </View><Cell.Group inset>
                <Field label='手机号' value={phone} onChange={(e) => setPhone(e.detail.value)} placeholder='请输入手机号' />

                <Field align='center' value={code} onChange={(e) => setCode(e.detail.value)} label='短信验证码' placeholder='请输入短信验证码'>
                    <Field.Button>
                        <CountDownButton verification={sendPhoneVerification} />
                    </Field.Button>
                </Field>
            </Cell.Group><View style={{ fontSize: 14, marginTop: 30 }}>
                <Checkbox checked={agree} onChange={() => setAgree(!agree)} />
                请阅读并同意 用户协议 和 隐私条款
            </View><View className='phone-login-bottom'>
                <Button block color='primary' onClick={wechatPhoneLogin}>微信手机号快捷登录</Button>
            </View>
        </View>
    )
}

export default Bind;