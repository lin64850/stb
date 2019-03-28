import { React, PageEvent, PageType } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { Key } from "@/config";
import { horizontaWholelPage } from "stb/decorator";

interface ITabProps {
    identCode: MType.Tab;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}

interface ITabState {
    dataList: any[];
}

@horizontaWholelPage(function () { return this.mod; })
export class TabModule extends React.Component<ITabProps, ITabState>{
    readonly con = this.props.con.conTab;
    readonly mod = this.props.con.modTab;

    constructor(props: ITabProps) {
        super(props);
        this.state = {
            dataList: [],
        }
        this.con.initView = this.initView;
    }

    render() {
    }

    initView = ({ dataList }, { index }) => {
        this.mod.setIndex(index);
        this.setIndex(index);
        this.setState({
            dataList,
        });
    };

    onChange(status, keycode) {
        if (status) {
            this.mod.setIndex(this.index);
            this.changeEpisode(this.state.dataList);
        }
    }

    onFront(data) {
        this.changeEpisode(data);
    }

    onBehind(data) {
        this.changeEpisode(data);
    }

    changeEpisode(data) {
        let { page } = data[this.index];
        this.props.con.conEpi.initPage({ pageIndex: page, index: 0, selectEpisode: 1 });
    }
}