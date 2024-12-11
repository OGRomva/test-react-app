import { makeAutoObservable, runInAction } from "mobx";
import { SatelliteService } from "../../api";
import { ISatellite } from "../../types";

class SatelliteStore {
    satellites: ISatellite[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}