import { observer } from 'mobx-react-lite';
import * as Cesium from 'cesium';
import { useEffect, useRef } from 'react';
import { CESIUM_TOKEN } from '../../config';
import { NoCesiumToken } from '../no-cesium-token';
import { SatelliteStore } from '../../stores';


export const CesuimMap: React.FC = observer(() => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const satelliteStore = new SatelliteStore();

    if (CESIUM_TOKEN) {
        Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;
    } else {
        return <NoCesiumToken/>
    }

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const viewer = new Cesium.Viewer(mapContainerRef.current, {
        timeline: false,
        animation: false,
        baseLayerPicker: true,
        });

        // Добавляем орбиты спутников
        satelliteStore.satellites.forEach((satellite) => {
        const orbitPositions = Cesium.SampledPositionProperty();
        const { tle } = satellite;

        const satelliteOrbit = new Cesium.SatelliteOrbit({
            tleLine1: tle[0],
            tleLine2: tle[1],
        });

        const positions = satelliteOrbit.generateOrbitPositions();
        positions.forEach((pos) => orbitPositions.addSample(pos.time, pos.cartesian));

        viewer.entities.add({
            name: satellite.name,
            position: orbitPositions,
            point: { pixelSize: 5, color: Cesium.Color.RED },
        });
    });

    return () => viewer.destroy();
  }, []);

  return <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />;
});
