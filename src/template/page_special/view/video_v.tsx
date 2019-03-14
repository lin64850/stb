import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { getImageAddress } from "@/config/config.tool";
import { focus } from "stb/decorator";

interface IVideoProps {
    identCode: number;
    event: PageEvent;
    ntt: any;
}
interface IVideoState {
}

@focus
export class VideoModule extends React.Component<IVideoProps, IVideoState>{
    // private readonly con = this.props.con;

    constructor(props: IVideoProps) {
        super(props);
        this.state = {
        }
        // this.con.initVideo = this.initView;
    }
    protected render() {
        return (
            <div class="component-video" style={{ left: Number(this.props.ntt.attr.x), top: Number(this.props.ntt.attr.y), width: Number(this.props.ntt.attr.width), height: Number(this.props.ntt.attr.height) }}>
                <img class={this.props.ntt.cover_image_url ? 'component-video-first' : 'component-video-first hide'} src={getImageAddress(this.props.ntt.cover_image_url)} />
                <img class={this.props.ntt.focus_cover_image_url ? 'component-video-last' : 'component-video-last hide'} src={getImageAddress(this.props.ntt.focus_cover_image_url)} />
            </div>
        )
    }
    private initView = () => {
        // TODO
    }
}