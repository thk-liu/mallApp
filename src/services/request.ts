import interceptors from "./interceptors"

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class request {
    
    /**
     * 通过Get方式获取请求
     * @param url 请求
     * @param params 参数
     * @returns 
     */
    get<T>(url: string, params: any) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url,
                method: "GET",
                data: params,
                success: (result: SuccessCallbackResult<T>) => resolve(result),
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
    put<T>(url: string, params: any) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url,
                method: "PUT",
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
    post<T>(url: string, params: any) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url,
                method: "POST",
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
    delete(url: string) {
        return new Promise((resolve, reject) => {
            Taro.request({
                url,
                method: "DELETE",
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