import { React, PageEvent, PageType } from "stb/component";
import { MType, IMemo } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { title_logo, pic_foc } from "../img_import";
import { getImageAddress, getClipAddress } from "@/config/config.tool";
import { marquee } from "stb/decorator";
import { Key } from "@/config";

interface IDefaultProps {
    identCode: MType.Default;
    event: PageEvent;
    con: PageControl;
}

interface IDefaultState {
    dataList?: any[];
}

@marquee
export class DefaultModule extends React.Component<IDefaultProps, IDefaultState>{
    readonly con = this.props.con.conDefault;
    readonly episodeView = new DefaultView();

    constructor(props: IDefaultProps) {
        super(props);
        this.state = {
            dataList: [],
        }
        this.con.initDefault = this.initView;
    }

    render() {
        return (
            <div class="defaultListContainer">
                <div class="default">
                    <div class="title_logo">
                        <img src={title_logo} alt="" />
                    </div>
                    <div class="top_list">
                        {
                            this.state.dataList.map((v, i) => {
                                return (
                                    <div class="list list2" tag={`${i < 4 ? "focus" : ""}`}>
                                        <img src={getClipAddress(getImageAddress(v.poster), 170, 240)} alt=""
                                            class="pic" />
                                        <img src={pic_foc} alt="" class="cursor" />
                                        <p class="caption">
                                            <span class="title" tag="running">{v.title}</span>
                                        </p>
                                        {
                                            this.episodeView.getCorner(v)
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    initView = (data, search) => {
        return new Promise((reslove) => {
            this.setIndex(search);
            this.setState({
                dataList: data,
            });
            reslove();
        })
    }

    onChange(status, keycode) {
        if (!status) {
            if (keycode === Key.Left) {
                this.target(MType.Keyboard);
            }
        }
    }

    onEnter() {
        const memo: IMemo = {
            key: this.identCode,
            search: this.search,
            pageType: this.props.con.conTab.getPageType(),
        }
        const { video_id } = this.state.dataList[this.search];
        this.trigger(PageType.Blank, { url: "./video_details.html", params: { video_id }, memo: memo });
    }

    onBackspace() {
        this.trigger(PageType.Previous);
    }
}

export class DefaultView {
    getCorner(v) {
        const corner = v.corner_mark;
        if (corner) {
            if (corner.top_left) {
                return (
                    <img class="corner top-left" src={getImageAddress(corner.top_left)} />
                )
            }
            else if (corner.bottom_left) {
                return (
                    <img class="corner bottom-left" src={getImageAddress(corner.bottom_left)} />
                )
            }
            else if (corner.top_right) {
                return (
                    <img class="corner top-right" src={getImageAddress(corner.top_right)} />
                )
            }
            else if (corner.bottom_right) {
                return (
                    <img class="corner bottom-right" src={getImageAddress(corner.bottom_right)} />
                )
            }
        }
        return false;
    }
}