import { makeAutoObservable } from "mobx";
import ISatellite from "../../types/ISatellite";


class SatelliteStore {
    satellites: ISatellite[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    
}