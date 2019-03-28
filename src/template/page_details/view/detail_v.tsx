import { React, PageEvent, PageType } from "stb/component";
import { MType, IMemo } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { focus } from "stb/decorator";
import { getImageAddress } from "@/config/config.tool";
import { Key, Cookie } from "@/config";
import { Json, FormatUrl } from "stb/basic";

interface IDetailProps {
    identCode: MType.Detail;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}

interface IDetailState {
}

@focus
export class DetailModule extends React.Component<IDetailProps, IDetailState>{
    private readonly con = this.props.con.conDet;
    private readonly mod = this.props.con.modDet;

    constructor(props: IDetailProps) {
        super(props);
        this.state = {
        }
        this.con.initView = this.initView;
    }

    render() {
    }

    initView = ({index}) => {
        this.setIndex(index);
    };
}