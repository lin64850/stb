import { ConfigBasic } from "@config.basic";
import { ConfigApi } from "@config.api";

export var Config = {
    ...ConfigBasic,
    ...ConfigApi,
    /**
     * 调试模式
     */
    debugMode: true
}