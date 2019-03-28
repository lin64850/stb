import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { tabs } from "stb/decorator";
import { DefaultModule } from "./default_v";
import { EmptyModule } from "./empty_v";
import { ListModule } from "./list_v";

interface ITabProps {
    event: PageEvent;
    con: PageControl;
}
interface ITabState {
    display?: number;
}

@tabs('show', 'toggle', 776, 720, 3)
export class TabModule extends React.Component<ITabProps, ITabState>{
    readonly con = this.props.con;

    constructor(props: ITabProps) {
        super(props);
        this.state = {
            display: 0
        }
        this.con.conTab.switchView = this.switchView;
        this.con.conTab.getPageType = this.getPageType;
    }

    render() {
        return (
            <div tag="tab-group" >
                <div tag="tab" control="0">
                    <DefaultModule identCode={MType.Default} event={this.event} con={this.con} />
                </div>
                <div tag="tab" control="1">
                    <EmptyModule identCode={MType.Empty} event={this.event} con={this.con} />
                </div>
                <div tag="tab" control="2">
                    <ListModule identCode={MType.List} event={this.event} con={this.con} />
                </div>
            </div>
        )
    }

    switchView = (display: number) => {
        this.setState({
            display: display
        });
    }

    getPageType = () => {
        return this.state.display;
    }
}