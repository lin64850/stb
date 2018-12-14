import { MainEntity } from "./entitys/main";

export let Config = {
    serviceDomain: '',
    imgDomain: '',
    apiPath: {
        main: ""
    },
    imgPath: {
        public: ""
    },
    /**
     * 调试模式，使用 LogComponen 必须开启
     */
    debugMode: true,
    pageName: {
    },
    /**
     * 项目唯一标识
     */
    mainCookieName: "***_token_cookiename"
}

let host = window.location.host;

// 自动检测本地服务器
if (-1 != host.indexOf("127.0.0.1:8080")) {
    // Config.serviceDomain = 'http://***.**.**.***:****';
    // Config.imgDomain = 'http://***.**.**.***:****';
}
// 自动检测测试服务器
else if (-1 != host.indexOf("***.**.**.***:****")) {
    // Config.serviceDomain = 'http://***.**.**.***:****';
    // Config.imgDomain = 'http://***.**.**.***:****';
}
// 自动检测正式服务器
else {
}

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