import { React, PageEvent, PageType } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { getImageAddress } from "@/config/config.tool";
import { focus } from "stb/decorator";
import { Key } from "@/config";
import { ParseUrl, FormatUrl } from "stb/basic";

interface IImageProps {
    identCode: number;
    event: PageEvent;
    ntt: any;
    con: PageControl;
}
interface IImageState {
}

@focus
export class ImageModule extends React.Component<IImageProps, IImageState>{
    // private readonly con = this.props.con;

    constructor(props: IImageProps) {
        super(props);
        this.state = {
        }
        // this.con.initImage = this.initView;
    }
    protected render() {
        return (
            <div tag="focus" class="component-img" style={{ left: Number(this.props.ntt.attr.x), top: Number(this.props.ntt.attr.y), width: Number(this.props.ntt.attr.width), height: Number(this.props.ntt.attr.height) }}>
                <img class={this.props.ntt.cover_image_url ? '' : 'hide'} src={getImageAddress(this.props.ntt.cover_image_url)} />
                <img class={this.props.ntt.focus_cover_image_url ? '' : 'hide'} src={getImageAddress(this.props.ntt.focus_cover_image_url)} />
            </div>
        )
    }

    subscribeToEvents(){
        this.onfocus(() => {
            // switchBg
            let bg = this.props.ntt.background_image_url;
            
            if (!bg) {
                bg = this.props.con.store.modContent.getBG();
            }
            this.props.con.conContent.switchBackground(bg);

        });
    };

    onChange(state,keyCode){
        if(!state){
            if (Key.Up === keyCode) {
                const value = this.props.ntt.attr.above;

                if (null !== value && "" !== value) {
                    this.target(Number(value));
                }

            }
            else if (Key.Right === keyCode) {

                const value = this.props.ntt.attr.right;

                if (null !== value && "" !== value) {
                    this.target(Number(value));
                }
            }
            else if (Key.Down === keyCode) {
                const value = this.props.ntt.attr.below;

                if (null !== value && "" !== value) {
                    this.target(Number(value));
                }
            }
            else if (Key.Left === keyCode) {
                const value = this.props.ntt.attr.left;

                if (null !== value && "" !== value) {
                    this.target(Number(value));
                }
            }
        }
    }

    onBackspace(){
        this.trigger(PageType.Previous);
    }

    onEnter(){
        const { behavior, target_url } = this.props.ntt.ext;
        
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

                const { video_id, episode } = this.props.ntt.ext;

                this.props.con.fullPlay(video_id,episode);

                // openFullPlayer(video_id, Number(episode)).then((playUrl) => {

                //     this.trigger(PageType.Blank, { url: playUrl });

                // });
            }
            // 返回 首页
            else if ("m_go_back_home" === behavior) {
                this.trigger(PageType.Previous, { url: "./index.html" });
            }
    }

    private initView = () => {
        // TODO
    }
}