import { CommonLogic } from "src/logics/common";

export class PlayModel {
    private readonly lgcCom = new CommonLogic();

    getData() {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }
}