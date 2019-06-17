import { observable } from "mobx";
import { IModel } from "stb-react";

export class BodyModel implements IModel {
    getIndex: () => number;
    identCode: string | number;
    identCodeTo: string | number;
    setIndex: (index: number) => void;
    setFocus: (index: number) => void;
    
    @observable
    dataList: [] = [];

    constructor() {
    }

    init(){

    }
}