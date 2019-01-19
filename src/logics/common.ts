/**
 * 依赖 axiosBase
 * @description axios 不支持同步请求
 */
import { BaseLogic } from "./axiosBase";
import { MainEntity } from "../entitys/main";
import { getApiAddress } from "@/config/config.tool";

interface IMain {
}

class CommonLogic extends BaseLogic {
    getMain(data: IMain) {

        return this.requestGet<MainEntity>({
            url: getApiAddress("main"),
            params: data,
            success: (res) => {
                res.data = res.data.result;
            }
        });

    }
}

export { CommonLogic }
