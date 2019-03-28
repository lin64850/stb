import { React, PageEvent, PageType } from "stb/component";
import { MType, IMemo } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { star_img, pic_foc } from "../img_import";
import { getClipAddress, getImageAddress } from "@/config/config.tool";
import { DefaultView } from "./default_v";
import { verticalWholelPage } from "stb/decorator";
import { Key } from "@/config";

interface IListProps {
    identCode: MType.List;
    event: PageEvent;
    con: PageControl;
}

interface IListState {
    dataList?: any[];
}

@verticalWholelPage(function () { return this.mod; }, { width: 4, height: 2 })
export class ListModule extends React.Component<IListProps, IListState>{
    readonly con = this.props.con.conList;
    readonly mod = this.props.con.store.modList;
    readonly episodeView = new DefaultView();
    readonly paging = this.props.con.store.modList.paging;

    constructor(props: IListProps) {
        super(props);
        this.state = {
            dataList: [],
        }
        this.con.initList = this.initView;
    }

    render() {
        return (
            <div class="listContainer">
                <div class="search_data">
                    <div class="search_data_title">
                        <img src={star_img} alt="" class="icon_left" />
                        <span class="title_name">为您找到以下精彩节目</span>
                        <img src={star_img} alt="" class="icon_right" />
                    </div>
                    <div class="page_num">
                        <div class="total">
                            共 {this.paging.getDataSize()} 部
                        </div>
                        <div class="line">
                        </div>
                        <div class="page_search">
                            {this.paging.getPageIndex()} /
                        </div>
                        <div class="page_size">
                            {this.paging.getCountPage()} 页
                        </div>
                    </div>
                    <div class="search_lists">
                        {
                            this.state.dataList.map((v, i) => {
                                if (i < 12) {
                                    return (
                                        <div class="list list2" tag={`${i < 8 ? "focus" : ""}`}>
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
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    initView = (list, search) => {
        return new Promise((reslove) => {
            this.setIndex(search);
            this.setState({
                dataList: list
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

    componentDidMount() {
        // 禁用默认加载
        return false;
    }

    onEnter() {
        const memo: IMemo = {
            key: this.identCode,
            search: this.search,
            pageType: this.props.con.conTab.getPageType(),
            pageIndex: this.con.store.paging.getPageIndex(),
            keyword: this.props.con.conKeyBoard.getKeyword(),
        }
        const { video_id } = this.state.dataList[this.search];
        this.trigger(PageType.Blank, { url: "./video_details.html", params: { video_id }, memo: memo });
    }

    onBackspace() {
        this.trigger(PageType.Previous);
    }
}