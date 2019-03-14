import { Key } from "@/config";
import { ParseUrl, FormatUrl } from "stb/basic";
import { PageType } from "stb/component";



/**
 * 移动事件
 */
export function decorateAutoFocus(Com,ntt) {

    return class extends Com {

        autoFocus(keyCode) {
            if (Key.Up === keyCode) {
                const value = ntt.attr.above;
                console.log(value);
                

                if (null !== value && "" !== value) {
                    this.target(Number(value));
                }

            }
            else if (Key.Right === keyCode) {

                const value = ntt.attr.right;

                if (null !== value && "" !== value) {
                    this.target(Number(value));
                }
            }
            else if (Key.Down === keyCode) {
                const value = ntt.attr.below;

                if (null !== value && "" !== value) {
                    this.target(Number(value));
                }
            }
            else if (Key.Left === keyCode) {
                const value = ntt.attr.left;

                if (null !== value && "" !== value) {
                    this.target(Number(value));
                }
            }

        }
    }
}
/**
 * 确认事件
 */
export function decorateOnEnter(Com,ntt) {
    if (!Com) {
        return;
    }
    return class extends Com {
        onEnter() {

            const { behavior, target_url } = ntt.ext;

            // 打开新页面
            if ("m_open_web_url" === behavior) {
                // 配置 return 参数
                let tagParams = new ParseUrl(target_url).getDecodeURIComponent();
                let curParams = new ParseUrl(window.location.href).getDecodeURIComponent();

                delete curParams.return;

                tagParams.return = new FormatUrl(window.location.href, curParams).getEncodeURIComponent();

                let url = new FormatUrl(target_url, tagParams).getEncodeURIComponent();
                this.trigger(PageType.Blank, { url: url });
            }
            // 返回上一级
            else if ("m_go_back_launcher" === behavior || "m_go_back" === behavior) {

                this.trigger(PageType.Previous);

            }
            // 打开全屏播放
            else if ("m_open_video_player" === behavior) {

                const { video_id, episode } = ntt.ext;

                // openFullPlayer(video_id, Number(episode)).then((playUrl) => {

                //     this.trigger(PageType.Blank, { url: playUrl });

                // });
            }
            // 返回 首页
            else if ("m_go_back_home" === behavior) {
                this.trigger(PageType.Blank, { url: "./index.html", clear: true });
            }
        }
    }
}
/**
 * 返回事件
 */
export function decorateOnBackspace(Com,ntt) {
    if (!Com) {
        return;
    }
    return class extends Com {
        onBackspace() {
            this.trigger(PageType.Previous);
        }
    }
}

