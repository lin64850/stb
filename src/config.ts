import { ConfigApi } from "./config.api";

export let Config = {
    ...ConfigApi,
    /**
     * 调试模式，使用日志插件必须开启
     */
    debugMode: true,
    /**
     * 项目唯一标识
     */
    mainCookieName: "xxx_token_cookiename"
}