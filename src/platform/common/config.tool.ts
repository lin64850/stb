import { MainEntity } from "../../entitys/main";
import { ConfigApi } from "./config.api";

/**
 * 初始化主入口
 */
export function initMain(): Promise<MainEntity> {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

/**
 * 获取API地址
 * @param keyWorlds Config.apiPath 取值
 * @param args {*} 占位符参数列表
 */
export function getApiAddress(keyWorlds: string, ...args: string[]) {
    let reg = /\{.*?\}/g;

    let url: string = ConfigApi.apiPath[keyWorlds];

    if (url) {
        let arr;
        arr = url.match(reg)
        for (let i = 0; i < args.length; i++) {
            url = url.replace(arr[i], args[i]);
        }
        return `${ConfigApi.serviceDomain}/${url}`;
    }
}

/**
 * 图片完整路径
 * @param path 路径
 */
export function getImageAddress(path: string) {
    return path ? `${ConfigApi.imgDomain}/${ConfigApi.imgPath.public}/${path}` : "";
}
