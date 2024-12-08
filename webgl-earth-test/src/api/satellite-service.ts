import { Axios, AxiosResponse } from "axios"
import { USE_SERVER_CONN } from "../config"
import ISatellite from "../types/ISatellite"
import $api from "./http"

export default class SatelliteService {
    static async fetchSatellites(): Promise<AxiosResponse<ISatellite[]> | ISatellite[]> {
        if (USE_SERVER_CONN) {
            return $api.get<ISatellite[]>('/get_satellite')
        } else {
            return [
                {
                    name: "ISS (ZARYA)",
                    line1: "1 25544U 98067A   21274.10427870  .00000536  00000-0  17649-4 0  9993", 
                    line2: "2 25544  51.6436 138.3242 0004197 271.5403 139.0825 15.48815359282448"
                }
            ] as ISatellite[]
        }
    }
}