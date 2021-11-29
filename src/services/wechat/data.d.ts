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
    openId:string;
    phoneNumber:string;
}

type RegisterResponse={
}