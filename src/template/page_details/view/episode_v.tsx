import { React, PageEvent, PageType } from "stb/component";
import { MType, IMemo } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { horizontaWholelPage } from "stb/decorator";
import { Key, Cookie } from "@/config";
import { Json, FormatUrl } from "stb/basic";

interface IEpisodeProps {
    identCode: MType.Episode;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}

interface IEpisodeState {
    dataList?: [];
    selectEpisode?: string;
}

@horizontaWholelPage(function () { return this.mod; })
export class EpisodeModule extends React.Component<IEpisodeProps, IEpisodeState>{
    private readonly con = this.props.con.conEpi;
    private readonly mod = this.props.con.modEpi;

    constructor(props: IEpisodeProps) {
        super(props);
        this.state = {
            dataList: [],
        }
        this.con.initView = this.initView;
    }

    protected render() {
    }

    private initView = ({ dataList, index, selectEpisode }) => {
        this.mod.setIndex(index);
        this.setIndex(index);
        this.setState({
            dataList,
            selectEpisode,
        });
    };

    protected onChange(status, keyCode) {
        if (status) {
            this.mod.setIndex(this.index);
        }
    }

    protected onFront() {
        this.con.changeTab((this.props.con.conTab));
    }

    protected onBehind() {
        this.con.changeTab((this.props.con.conTab));
    }
}