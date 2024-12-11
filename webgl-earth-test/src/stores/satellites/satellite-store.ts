import { makeAutoObservable, runInAction } from "mobx";
import { SatelliteService } from "../../api";
import { ISatellite } from "../../types";

export class SatelliteStore {
    satellites: ISatellite[] = [];
    selectedSatellites: ISatellite[] = [];
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchSatellites() {
        this.isLoading = true;
        const data = await SatelliteService.fetchSatellites(); 
        
        runInAction(() => {
            this.satellites = data;
            this.isLoading = false;
        });
    }
}