import { React, PageEvent, PageType } from "stb/component";
import { MType, IMemo } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { getClipAddress, getImageAddress } from "@/config/config.tool";
import { Key, Cookie } from "@/config";
import { marquee } from "stb/decorator";
import { Config } from "src/config";

interface IRecommendProps {
    identCode: MType.Recommend;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}

interface IRecommendState {
    dataList?: any[];
}

@marquee
export class RecommendModule extends React.Component<IRecommendProps, IRecommendState>{
    readonly con = this.props.con.conRec;
    readonly mod = this.props.con.modRec;

    constructor(props: IRecommendProps) {
        super(props);
        this.state = {
            dataList: [],
        }
        this.con.initView = this.initView;
    }

    render() {
    }

    initView = ({ dataList }) => {
        this.setState({
            dataList,
        })
    };
}