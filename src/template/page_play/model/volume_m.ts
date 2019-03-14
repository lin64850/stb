import { CommonLogic } from "src/logics/common";

export class VolumeModel {
    private readonly lgcCom = new CommonLogic();

    getData() {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }
}