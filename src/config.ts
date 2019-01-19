import { ConfigBasic, ConfigApi } from "@/config";

export var Config = {
    ...ConfigBasic,
    ...ConfigApi,
    /**
     * 调试模式
     */
    debugMode: true
}