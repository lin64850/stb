import { React, PageEvent, PageType } from "stb/component";
import { MType, IMemo } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { DefaultView } from "./default_v";
import { getClipAddress, getImageAddress } from "@/config/config.tool";
import { pic_foc, empty_img, star_img } from "../img_import";
import { marquee } from "stb/decorator";
import { Key } from "@/config";

interface IEmptyProps {
    identCode: MType.Empty;
    event: PageEvent;
    con: PageControl;
}

interface IEmptyState {
    dataList?: any[];
}

@marquee
export class EmptyModule extends React.Component<IEmptyProps, IEmptyState>{
    private readonly con = this.props.con.conEmpty;
    private readonly episodeView = new DefaultView();

    constructor(props: IEmptyProps) {
        super(props);
        this.state = {
            dataList: [],
        }
        this.con.initEmpty = this.initView;
    }

    render() {
        return (
            <div class="emptyListContainer">
                <div class="empty">
                    <div class="title_logo">

                        <div class="title_tex">
                            <img src={empty_img} alt="" />
                            <span>
                                暂无相关内容哦~
                        </span>
                        </div>
                    </div>
                    <div class="search_data_title">
                        <img src={star_img} alt="" class="icon_left" />
                        <span class="title_name">为您推荐</span>
                        <img src={star_img} alt="" class="icon_right" />
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
            keyword: this.props.con.conKeyBoard.getKeyword(),
        }
        const { video_id } = this.state.dataList[this.search];
        this.trigger(PageType.Blank, { url: "./video_details.html", params: { video_id }, memo: memo });
    }

    onBackspace() {
        this.trigger(PageType.Previous);
    }
}