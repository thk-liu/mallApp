import Taro from '@tarojs/taro'
import interceptors from "./interceptors"
import options from './options'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class request {
    getDefaultHeaders() {
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
    /**
     * 通过Get方式获取请求
     * @param url 请求
     * @param params 参数
     * @returns 
     */
    get<T>(requestUrl: string, params?: any) {
        return new Promise<T>((resolve, reject) => {
            Taro.request({
                url: `${options.API_GATEWAY}${requestUrl}`,
                method: "GET",
                header: this.getDefaultHeaders(),
                data: params,
                success: (result: SuccessCallbackResult<T>) => resolve(result.data),
                fail: response => reject(response)
            })
        })
    }

    /**
     * 通过PUT方式请求
     * @param url 
     * @param params 
     * @returns 
     */
    put<T>(requestUrl: string, params: any) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${options.API_GATEWAY}${requestUrl}`,
                method: "PUT",
                header: this.getDefaultHeaders(),
                data: params,
                success: (result: SuccessCallbackResult<T>) => resolve(result.data),
                fail: response => reject(response)
            })
        })
    }

    /**
     * 通过POST方式获取请求
     * @param url 
     * @param params 
     * @returns 
     */
    post<T>(requestUrl: string, params: any) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${options.API_GATEWAY}${requestUrl}`,
                method: "POST",
                header: this.getDefaultHeaders(),
                data: params,
                success: (result: SuccessCallbackResult<T>) => resolve(result.data),
                fail: response => reject(response)
            })
        })
    }

    /**
     * 通过Delete方式请求
     * @param url 
     * @param params 
     * @returns 
     */
    delete(requestUrl: string) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${options.API_GATEWAY}${requestUrl}`,
                method: "DELETE",
                header: this.getDefaultHeaders(),
                success: (result: SuccessCallbackResult<any>) => resolve(result.data),
                fail: response => reject(response)
            })
        })
    }

}

type SuccessCallbackResult<T> = {
    data: T,
    header: Record<string, any>,
    statusCode: number,
    errMsg: string
}

export default new request();