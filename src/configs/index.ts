export { ConfigApi } from "./config.api";
export { ConfigBasic } from "./config.basic";
export { Tools } from "./config.tool";
import { Authentication } from "./config.join.auth";
import { Order, OrderCallBack } from "./config.join.order";
import { Play } from "./config.join.play";
import { getSourceAddress, backLaunch, getPlatform, setPlatform } from "./config.join";

const Join = {
    Authentication,
    Order,
    OrderCallBack,
    Play,
    getSourceAddress, backLaunch, getPlatform, setPlatform
}
export {
    Join
}
