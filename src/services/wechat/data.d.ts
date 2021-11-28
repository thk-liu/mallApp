export type Code2SessionResponse={
    openId: string;
    sessionKey: string;
    unionid: string;
}

type EncryptPhoneInput={
    encryptedData:string;
    iv:string;
    sessionKey:string;
}

type RegisterByOpenIdAndPhoneInput={
    openid:string;
    phoneNumber:string;
}

type RegisterResponse={
}