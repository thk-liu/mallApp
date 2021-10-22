import { useState } from 'react'
import { Button } from "@taroify/core"

type CountDownButton = {
    duration?: number,
    sender: () => Promise<void>
}

export default (props: CountDownButton) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [text, setText] = useState<string>('发送短信');
    const { duration, sender } = props;

    const countDown = () => {
        setDisabled(true);
        let countDownDuration = duration || 10;
        const interval = setInterval(() => {
            console.log('setTimeout', countDownDuration)
            countDownDuration = countDownDuration - 1;
            setText(`${countDownDuration}秒后重发`)
            if (countDownDuration == 0) {
                setDisabled(false);
                setText('发送短信');
                clearInterval(interval)
            }
        }, 1000);
    }
    return (
        <Button disabled={disabled} color={disabled ? 'default' : 'primary'} size='small' onClick={() => sender().then(() => countDown())}> {text}</Button >)
}