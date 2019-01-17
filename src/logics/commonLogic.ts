/**
 * 依赖 SystemBase
 * @description 原生Ajax 支持同步请求
 */
import { BaseLogic, RequestInfo, ResponseInfo } from "./systemBase";
import { getApiAddress } from "@config.tool";

interface IMain {
}

class CommonLogic extends BaseLogic {
    getMain(data: IMain, callback: (info: ResponseInfo<any>) => void) {
        let url = getApiAddress("main");
        let params = data;

        let request = new RequestInfo(url, data, function (res) {
            res.status = res._response.result.state;
            res.message = res._response.result.reason;
            res.success = 200 == res.status ? true : false;

            if (res.success) {
                const data = res._response.data;
                if (data) {
                    res.data = createModel(data);
                }
            } else {
                // ...
            }
            callback(res);
        });
        var createModel = function (data: any) {
            return data;
        }
        this.syncGet(request);
    }
}

export { CommonLogic }