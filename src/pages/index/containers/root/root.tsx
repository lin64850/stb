import { Component, h } from "stb-react";
import { observer } from "mobx-stb";
import { MType } from "../..";
import RootModel from "../../models/root_model";
import { Nav } from "../nav/nav";
import { Control } from "../control/control";
import { Body } from "../body/body";

@observer
class Root extends Component<Index.IRootProps, Index.IRootState>{
    store: RootModel = this.props.store;

    componentDidMount() {
        // init page all
        this.store.init().then(({ target }) => (this.target(MType.Nav)));
    }
    render() {

        return (
            <div class="content">

                <img class="bg" src={this.store.bg} />

                <Nav identCode={MType.Nav} event={this.event} store={this.store.modNav} />

                <Control identCode={MType.Control} event={this.event} store={this.store.modCont} />

                <Body identCode={MType.Body} event={this.event} store={this.store.modBody} />
            </div>
        )
    }
}
export default Root;