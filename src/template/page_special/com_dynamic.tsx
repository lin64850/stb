import { decorateOnBackspace, decorateAutoFocus, decorateOnEnter } from "./com_basic";
import { ImageModule } from "./view/image_v";
import { VideoModule } from "./view/video_v";
import { BackgroundModule } from "./view/background_v";

/**
 * 生成组件类型
 * 装饰组件逻辑
 */
export function getDynamic(ntt) {

    let Module;

    // * 生成组件类型
    if (ntt.tag_type) {
        if ("image" === ntt.tag_type) {
            Module = ImageModule;
        }
        else if ("video" === ntt.tag_type) {
            Module = VideoModule;
        }
    }


    // * 装饰通用逻辑
    if ("background" !== ntt.tag_type) {
        Module = ImageModule;
    }

    return Module;
}