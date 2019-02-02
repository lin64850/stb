
import { Config } from "src/config";
import { MainEntity } from "src/entitys/main";

/**
 * 初始化主入口
 */
export function initMain(): Promise<MainEntity> {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

/**
 * 清除全站数据
 */
export function clearGlobalData(): Promise<any> {
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

    let url: string = Config.apiPath[keyWorlds];

    if (url) {
        let arr;
        arr = url.match(reg)
        for (let i = 0; i < args.length; i++) {
            url = url.replace(arr[i], args[i]);
        }
        return `${Config.serviceDomain}/${url}`;
    }
}

/**
 * 图片完整路径
 * @param path 路径
 */
export function getImageAddress(path: string) {
    return path ? `${Config.imgDomain}/${Config.imgPath.public}/${path}` : "";
}

/**
 * 图片裁剪
 */
export function getClipAddress(src: string, width: number, height: number) {
    return src + `_${width}x${height}` + src.substr(src.lastIndexOf(".", src.length));
}

/**
 * 域名截取
 * @param str 地址
 */
export function getDomainURI(str) {
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
}

/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度(英文长度)
 * @param type: 截取后的后缀字符串默认"...",若不要请传参数"".
 */
export function substr(str: string, len: number, type: any) {
    type = type == null ? "..." : type;
    let str_length = 0;
    let str_len: any;
    let str_cut = new String();
    let str_arry: any

    str_len = str.length;
    let sArr = str.match(/[^\x00-\xff]/ig);
    let strL = str_len + (sArr == null ? 0 : sArr.length);
    if (strL <= len + 3) {
        return str;
    }
    for (let i = 0; i < str_len; i++) {
        let a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            str_length++;
        }
        str_cut = str_cut.concat(a);
        // str_cut.push(a);
        if (str_length >= len) {
            str_cut = str_cut.concat(type);
            return str_cut;
        }
    }
    str_cut = null;
}