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
    private readonly con = this.props.con.conTab;
    private readonly mod = this.props.con.modTab;

    constructor(props: ITabProps) {
        super(props);
        this.state = {
            dataList: [],
        }
        this.con.initView = this.initView;
    }

    protected render() {
    }

    private initView = ({ dataList }, { index }) => {
        this.mod.setIndex(index);
        this.setIndex(index);
        this.setState({
            dataList,
        });
    };

    protected onChange(status, keycode) {
        if (status) {
            this.mod.setIndex(this.index);
            this.changeEpisode(this.state.dataList);
        }
    }

    protected onFront(data) {
        this.changeEpisode(data);
    }

    protected onBehind(data) {
        this.changeEpisode(data);
    }

    private changeEpisode(data) {
        let { page } = data[this.index];
        this.props.con.conEpi.initPage({ pageIndex: page, index: 0, selectEpisode: 1 });
    }
}