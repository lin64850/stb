import { Component, h } from "stb-react";
import { observer } from "mobx-stb";
import { MType } from "../..";
import { Key } from "stb-key";
import { focus } from "stb-decorator";
import {BodyModel} from "../../models/body_model";
import { Focus } from "stb-shadow";

@focus
@observer
export class Body extends Component<Index.IBodyProps, Index.IBodyState>{

    store: BodyModel = this.props.store;

    onChange(status, keyCode) {
        if (!status) {
            if (Key.Up === keyCode) {
                this.target(MType.Nav);
            } else if (Key.Down === keyCode) {

                const tags: any = this.tags.getAll();

                const f = Focus.scope(tags, this.index, keyCode);

                if (f) {
                    this.setFocus(f.index);
                }
            }
        }
    }

    render() {

        return (
            <div class="recommend">
                <div class="item-group col-1">
                    <div class="item big" tag={0} >
                        <img class="def" src={this.getCover()} />
                        <img class="foc" src={this.getFocCover()} />
                    </div>

                    <div class="item small item-1" tag={1}>
                        <img class="def" src={this.getCover()} />
                        <img class="foc" src={this.getFocCover()} />
                    </div>

                    <div class="item small" tag={2}>
                        <img class="def" src={this.getCover()} />
                        <img class="foc" src={this.getFocCover()} />
                    </div>
                </div>
                <div class="item-group">
                    <div class="item long" tag={3}>
                        <img class="def" src={this.getCover()} />
                        <img class="foc" src={this.getFocCover()} />
                    </div>
                </div>
                <div class="item-group col-3">
                    <div class="item noraml" tag={4}>
                        <img class="def" src={this.getCover()} />
                        <img class="foc" src={this.getFocCover()} />
                    </div>
                    <div class="item noraml noraml-2" tag={5}>
                        <img class="def" src={this.getCover()} />
                        <img class="foc" src={this.getFocCover()} />
                    </div>
                </div>
            </div>
        )
    }

    getCover() {
        return ''
    }
    getFocCover() {
        return ''
    }
}