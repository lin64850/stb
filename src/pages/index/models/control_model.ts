import { IModel } from "stb-react";
import { MainEntity } from "../../../../entitys";

class ControlModel implements IModel {
    identCode: string | number; identCodeTo: string | number;
    setIndex: (index: number) => void;
    setFocus: (index: number) => void;

    init({ }, memo: Index.IMemo) {
        if (this.identCode === memo.identCode) this.setFocus(memo.index);
    }
}
export {
    ControlModel
}