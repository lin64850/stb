import { observable } from "mobx";
import { IModel } from "stb-react";

export default class BodyModel implements IModel {
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