import { Config } from "../config";
import { Dictionary } from "../framework/conllection/dictionary";
import { Json } from "../framework/basic/json";

export class ResponseInfo<T> {
    public readonly _response;
    public readonly _success: boolean;
    public readonly _status: number;
    public data: T;
    constructor(res: any) {
        this._status = res.status;
        this._success = Boolean(this._status === 200);
        this.data = res.data;
        this._response = res;
    }
}

declare let axios: any;

interface IRequest {
    url: string;
    params?: any;
    headers?: any;
    success?: (res: ResponseInfo<any>) => void;
}

export class BaseLogic {
    constructor() {
    }
    protected requestGet<T>(params: IRequest, cache?: Dictionary): Promise<ResponseInfo<T>> {
        return this.request<T>({
            method: "get",
            ...params
        }, cache);
    }
    protected requestPost(params: IRequest, cache?: Dictionary) {
        return this.request({
            method: "post",
            ...params
        }, cache);
    }
    private request<T>(params: any, cache?: Dictionary): Promise<any> {

        let success = params.success;
        delete params.success;

        return new Promise((resolve, reject) => {

            let isnet = true;
            if ("get" === params.method) {
                let key = md5(`${params.url}${Json.serializ(params.params)}`);

                if (cache && cache.has(key)) {

                    isnet = false;

                    const info = cache.get(key);

                    let res = new ResponseInfo(info);

                    success && success(res);

                    resolve(res);

                }
            }
            else if ("post" === params.method) {
                params.data = params.params;
                delete params.params;
            }

            if (isnet) {
                axios(params).then((info) => {

                    // 处理缓存仅支持 GET
                    if ('get' == params.method && cache) {

                        let key = md5(`${params.url}${Json.serializ(params.params)}`);

                        cache.set(key, info);
                    };

                    let res = new ResponseInfo(info);

                    success && success(res);

                    resolve(res);

                }).catch((msg) => {

                    reject(msg);

                });
            }


        });

    }
}