
import { FormComponent } from "stb/plugin";

/**
 * 订购
 */
let Order: IOrder = (params: AuthenticationResult, callBack) => {
    return new Promise((resolve, reject) => {

        const { jumpUrl, productPackage } = params;

        if (jumpUrl && jumpUrl.trim()) {

            // 前往订购
            callBack("jump").then(() => {
                orderJump(params);
            });

        } else if (productPackage) {

            // 产品包选择
            callBack("product").then(() => {
                orderProduct(params);
            });

        } else {
            reject("Order:method 为空或类型错误");
            return;
        }
        resolve();
    });
}

/**
 * 订购跳转
 * @description 编写跳转订购代码
 */
function orderJump(params: AuthenticationResult) {
    // TODO
    // const form = new FormComponent();
    // form.setProps({});

    // 表单模式 get 请求
    // form.submit("get", jumpUrl);

    // 表单模式 post 请求
    // form.submit("post", jumpUrl);

    // epg 跳转
    // window.location.href = jumpUrl;
}

/**
 * 订购产品包选择跳转
 * @description 编写跳转产品包代码
 */
function orderProduct(params: AuthenticationResult) {
    // TODO
    // window.location.href = "./product_package.html";
}

/**
 * 订购回调 
 * @description EPG 跳转、表单跳转、APK打开回调处理
 */
let OrderCallBack: IOrderCallBack;

OrderCallBack = (...args) => {
    // TODO

}

/**
 * APK 回调
 */
window['OrderCallBack'] = OrderCallBack;

export { Order, OrderCallBack }