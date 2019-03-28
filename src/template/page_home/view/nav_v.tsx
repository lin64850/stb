import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { focus } from "stb/decorator";

interface INavProps {
    identCode: MType.Nav;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}
interface INavState {
    dataList?: RecomPageEntity[];
}

@focus
export class NavModule extends React.Component<INavProps, INavState>{
    readonly con = this.props.con.conNav;
    readonly mod = this.props.con.modNav;

    constructor(props: INavProps) {
        super(props);
        this.state = {
            dataList: []
        }
        this.con.initView = this.initView;
    }
    render() {
    }
    onChange(status, keyCode) {
        if (status) {
            this.con.switchPage({ navIdx: this.index });
        }
    }
    initView = (dataList, { navIdx }) => {

        // 设置焦点
        this.setIndex(navIdx);

        // 渲染数据
        if (dataList) {
            this.setState({
                dataList: dataList
            });
        }
    };
}