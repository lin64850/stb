import { VolumeModel } from "../model/volume_m";

export class VolumeControl {
    private readonly store: VolumeModel;

    constructor(parms: VolumeModel) {
        this.store = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }
}