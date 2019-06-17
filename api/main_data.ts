import { MainEntity } from "../entitys";
import { BaseLogic } from "./base";

class MainData extends BaseLogic {
    /**
     * GET 请求
     */
    mainGet(data: API.IMainData) {
        return this.requestGet<MainEntity>({
            url: this.getApiAddress("main"),
            params: data,
            success: (res) => {
                res.data = res.data.result;
            }
        });


    }
    /**
     * POST 请求
     */
    mainPost(data: API.IMainData) {
        return this.requestPost({
            url: this.getApiAddress("main"),
            params: data,
            success: (res) => {
                res.data = res.data.result;
            }
        });

    }
}
export {
    MainData
};
