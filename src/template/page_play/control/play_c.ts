import { PlayModel } from "../model/play_m";

export class PlayControl {
    private readonly store: PlayModel

    constructor(parms: PlayModel) {
        this.store = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }

    initPlayConView: () => Promise<any>;
}