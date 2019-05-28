import { ConfigApi } from "./config.api";
import { FormatUrl } from "stb-tools";

export var Tools = {
    /**
     * 清除全站数据
     */
    clearGlobalData(): Promise<any> {
        return new Promise((resolve) => {
            // pages.forEach((item) => {
            //     new Cookie(`${Config.mainCookieName}_${item}_source`).clearCookie();
            //     new Cookie(`${Config.mainCookieName}_${item}_status`).clearCookie();
            // });
            resolve();
        });
    },

    /**
     * 获取API地址
     * @param keyWorlds Config.apiPath 取值
     * @param args {*} 占位符参数列表
     */
    getApiAddress(keyWorlds: string, ...args: string[]) {
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
    },

    /**
     * 图片完整路径
     * @param path 路径
     */
    getImageAddress(path: string) {
        return path ? `${ConfigApi.imgDomain}/${ConfigApi.imgPath.public}/${path}` : "";
    },

    /**
     * 图片裁剪
     */
    getClipAddress(src: string, width: number, height: number) {
        return src + `_${width}x${height}` + src.substr(src.lastIndexOf(".", src.length));
    },

    /**
     * 域名截取
     * @param str 地址
     */
    getDomainURI(str) {
        if (!str) {
            return "";
        }
        var durl = /http:\/\/([^\/]+)\//i;
        let domain = str.match(durl);

        // 非 http:// 开头
        if (!domain) {
            durl = /([^\/]+)\//i;
            domain = str.match(durl);
        }
        return domain[1];
    },

    /**
     * 干净的URL
     */
    getNestUrl() {
        return new FormatUrl(window.location.href, {}).getURL();
    }
}