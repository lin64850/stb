import { PageModel } from "../model/page_m";
import { DetailControl } from './detail_c';
import { EpisodeControl } from "./episode_c";
import { DetailModel } from "../model/detail_m";
import { EpisodeModel } from "../model/episode_m";
import { TabModel } from '../model/tab_m';
import { TabControl } from './tab_c';
import { RecommendModel } from "../model/recommend_m";
import { RecommendControl } from './recommend_c';

export class PageControl {
    public readonly store: PageModel;
    // Model
    public readonly modDet: DetailModel;
    public readonly modEpi: EpisodeModel;
    public readonly modTab: TabModel;
    public readonly modRec: RecommendModel;
    // Control
    public readonly conDet: DetailControl;
    public readonly conEpi: EpisodeControl;
    public readonly conTab: TabControl;
    public readonly conRec: RecommendControl;

    constructor(store: PageModel) {
        this.store = store;
        // Model
        this.modDet = new DetailModel(this.store.nttMain);
        this.modEpi = new EpisodeModel(10, this.store.nttMain);
        this.modTab = new TabModel(10, this.modEpi);
        this.modRec = new RecommendModel(this.store.nttMain);
        // Control
        this.conDet = new DetailControl(this.modDet);
        this.conEpi = new EpisodeControl(this.modEpi);
        this.conTab = new TabControl(this.modTab);
        this.conRec = new RecommendControl(this.modRec);
    }

    initPage(): Promise<any> {
        return new Promise((resolve) => {
            const { key, episodeIndex, episodePage, tabIndex, tabPage, detailsIndex, selectEpisode } = this.store.getMemo();
            const { videoId } = this.store.request;
            // 详情
            this.conDet.initPage({ videoId }, { index: detailsIndex }).then((videoInfo) => {
                // 选集
                this.modEpi.setCondition(videoInfo.id, videoInfo.ext);
                this.conTab.initPage({ pageIndex: tabPage, index: tabIndex }).then(() => {
                    this.conEpi.initPage({ pageIndex: episodePage, index: episodeIndex, selectEpisode });
                });
            });
            // 推荐
            this.conRec.initPage({ videoId: videoId });
            resolve(key);
        });
    }
}