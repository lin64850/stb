import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { verticalWholelPage } from "stb/decorator";

interface IListProps {
    identCode: MType.List;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}
interface IListState {
    dataList?: AssetPackageItemEntity[];
}

@verticalWholelPage(function () { return this.mod }, { width: 5, height: 2 })
export class ListModule extends React.Component<IListProps, IListState>{
    private readonly con = this.props.con.conLis;
    private readonly mod = this.props.con.modLis;

    constructor(props: IListProps) {
        super(props);
        this.state = {
            dataList: []
        }
        this.con.initView = this.initView;
    }
    protected render() {
        return (
            <div class="content">
                <span>Hello EPG!</span>
            </div>
        )
    }
    protected componentDidMount() {
        // 禁用默认加载
        return false;
    }
    private initView = () => {
    };
}