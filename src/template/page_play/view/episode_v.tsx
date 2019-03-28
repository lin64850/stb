import { React, PageEvent, PageType } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log, addPlay, getCurrentTime } from "../com_import";
import { sp_btn_item_def_png, sp_btn_item_foc_png, sp_btn_item_act_png } from "../img_import";
import { horizontaWholelPage } from "stb/decorator";
import { Key } from "@/config";
import { btn_item_def } from "../img_import";

interface IEpisodeProps {
    identCode: MType.Episode;
    event: PageEvent;
    con: PageControl;
}

interface IEpisodeState {
    dataList?: any[]
    selectEpisode?: boolean;
    display?: boolean
}

@horizontaWholelPage(function () { return this.mod; })
export class EpisodeModule extends React.Component<IEpisodeProps, IEpisodeState>{
    readonly con = this.props.con.conEpisode;
    readonly mod = this.props.con.store.episodeModule;

    constructor(props: IEpisodeProps) {
        super(props);
        this.state = {
            dataList: [],
            selectEpisode: true,
            display: false
        }
        this.con.initView = this.initView;
        this.con.setCurrentIndex = this.setCurrentIndex;
    }

    render() {
        return (
            <div class="episode" style={{ display: this.state.display ? "block" : "none" }}>
                <div class="item-group">
                    {
                        this.state.dataList.map((v, i) => {
                            if (i < 10) {
                                return (
                                    <div class={`item ${v.seq == this.state.selectEpisode ? 'enable' : ''}`} tag='focus'>
                                        {/* <img class="def" src={sp_btn_item_def_png} /> */}
                                        <img class="ena" src={sp_btn_item_foc_png} />
                                        <img class="foc" src={btn_item_def} />
                                        <span class="txt">{v.seq}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    initView = (dataList: any[], pageIndex, index) => {
        return new Promise((resolve) => {
            this.setIndex(index);
            this.con.currentIndex = index;
            this.setState({
                dataList: dataList
            });
            resolve();
        });
    }

    setCurrentIndex = (index) => {
        this.setIndex(index);
    }

    subscribeToEvents() {
        this.onfocus(() => {
            this.setState({
                display: true
            })
        })
        this.onblur(() => {
            this.setState({
                display: false
            })
        })
    }

    onChange(status, keycode) {
        if (!status) {
            if (keycode === Key.Left) {
                if (!this.mod.isFront()) {
                    return false;
                }
            }
        }
    }

    onBackspace() {
        this.target(MType.Page)
    }

    onEnter() {
        addPlay(this.props.con.props.requ.videoId, this.state.dataList[this.con.currentIndex].seq, getCurrentTime());
        let seq = this.state.dataList[this.index].seq;
        let title = this.state.dataList[this.index].title;
        let pageIndex = Math.ceil(Number(seq) / 10);
        this.con.currentIndex = this.index;
        this.props.con.conProgress.initProgressView(title, { pageIndex: pageIndex, index: this.index, seq: seq }).then(() => {
            this.props.con.fullPlay(this.mod.videoId, seq)
        })
    }

    componentDidMount() {
        return false;
    }
}