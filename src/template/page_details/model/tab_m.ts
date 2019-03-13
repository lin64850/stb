import { WholePageControl } from "stb/controller";
import { Paging } from "stb/basic";
import { EpisodeModel } from "./episode_m";

export class TabModel extends WholePageControl {
    public readonly paging: Paging;
    private readonly mod: EpisodeModel;
    /**
     * 焦点序号
     */
    private index: number;

    constructor(size, mod: EpisodeModel) {
        super(size);
        this.mod = mod;
    }

    protected getData(index): Promise<any[]> {
        return new Promise((resolve) => {
            this.mod.getTabs(index, this.cuteRange).then((data) => {
                this.paging.setDataSize(Number(data.countData));
                resolve(data.list);
            });
        });
    }

    /**
     * 设置焦点坐标
     * @param index 坐标序号
     */
    setIndex(index: number) {
        this.index = index;
    }

    /**
     * 读取焦点坐标
     */
    getIndex() {
        return this.index;
    }
}