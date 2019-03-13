import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { focus } from "stb/decorator";

interface IMenuProps {
    identCode: MType.Menu;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}
interface IMenuState {
    dataList?: AssetPackageEntity[];
}

@focus
export class MenuModule extends React.Component<IMenuProps, IMenuState>{
    private readonly con = this.props.con.conMen;
    private readonly mod = this.props.con.modMen;

    constructor(props: IMenuProps) {
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
    protected onChange(status, keyCode) {
        if (status) {
            this.con.switchPage({ navIdx: this.index });
        }
    }
    private initView = (method: "play" | "collect") => {

        this.setIndex('play' === method ? 0 : 1);

        this.setState({});

    };
}